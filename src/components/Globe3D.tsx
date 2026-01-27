import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';

/**
 * Globe3D - Minimal 3D globe for portfolio
 * Style: flat colors, soft lighting, professional
 */

interface Globe3DProps {
  size?: number;
  loadingText?: string;
}

export function Globe3D({ size = 320, loadingText = 'Rendering...' }: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Initialize globe only when it enters viewport (lazy loading)
  // This prevents blocking the main thread during initial page load
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Small delay to ensure smooth scroll
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
          observer.disconnect();
        }
      },
      { rootMargin: '100px' } // Start loading 100px before visible
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isVisible) return;

    setIsLoading(true);
    const container = containerRef.current;
    let animationId: number;
    let isInitialized = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let cleanupCalled = false;

    // Check WebGL support first
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL not supported, globe disabled');
        return;
      }
    } catch (e) {
      console.warn('WebGL check failed, globe disabled');
      return;
    }

    // Use async IIFE to handle dynamic import
    const initGlobe = async () => {
      // Dynamic import to catch WebGPU errors on unsupported devices
      let ThreeGlobe;
      try {
        const module = await import('three-globe');
        ThreeGlobe = module.default;
      } catch (e) {
        console.warn('Failed to load three-globe (WebGPU not supported):', e);
        return;
      }

      // Check if cleanup was called during async import
      if (cleanupCalled) return;

      // ========================================
      // SCENE SETUP
      // ========================================
      let scene: THREE.Scene;
      let camera: THREE.PerspectiveCamera;
      let globe: InstanceType<typeof ThreeGlobe>;

      try {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        camera.position.z = 220;

        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        });
        renderer.setSize(size, size);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // ========================================
        // GLOBE CREATION
        // ========================================
        globe = new ThreeGlobe()
          .globeMaterial(
            new THREE.MeshPhongMaterial({
              color: 0x1a365d,
              transparent: true,
              opacity: 0.95,
            })
          )
          .showAtmosphere(true)
          .atmosphereColor('#60a5fa')
          .atmosphereAltitude(0.12);

        scene.add(globe);
      } catch (e) {
        console.warn('Globe initialization failed:', e);
        if (renderer) {
          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        }
        return;
      }

      // ========================================
      // MARKER - Apple Maps style pin
      // Cosenza, Calabria, Italy: 39.2988°N, 16.2539°E
      // ========================================
      const COSENZA_LAT = 39.2988;
      const COSENZA_LNG = 16.2539;
      const GLOBE_RADIUS = 100;

      const latRad = COSENZA_LAT * (Math.PI / 180);
      const lngRad = COSENZA_LNG * (Math.PI / 180);

      const x = GLOBE_RADIUS * Math.cos(latRad) * Math.sin(lngRad);
      const y = GLOBE_RADIUS * Math.sin(latRad);
      const z = GLOBE_RADIUS * Math.cos(latRad) * Math.cos(lngRad);

      const markerGroup = new THREE.Group();

      const borderGeometry = new THREE.RingGeometry(2.2, 3.2, 32);
      const borderMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        depthTest: false,
      });
      const border = new THREE.Mesh(borderGeometry, borderMaterial);
      border.renderOrder = 998;
      markerGroup.add(border);

      const centerGeometry = new THREE.CircleGeometry(2.2, 32);
      const centerMaterial = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        side: THREE.DoubleSide,
        depthTest: false,
      });
      const center = new THREE.Mesh(centerGeometry, centerMaterial);
      center.renderOrder = 999;
      markerGroup.add(center);

      const normal = new THREE.Vector3(x, y, z).normalize();
      markerGroup.position.set(
        x + normal.x * 2,
        y + normal.y * 2,
        z + normal.z * 2
      );

      markerGroup.lookAt(normal.x * 200, normal.y * 200, normal.z * 200);
      globe.add(markerGroup);

      // ========================================
      // LOAD COUNTRIES
      // ========================================
      const loadCountries = () => {
        fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
          .then((res) => res.json())
          .then((worldData: Topology<{ countries: GeometryCollection }>) => {
            const countries = feature(worldData, worldData.objects.countries);
            globe
              .polygonsData(countries.features)
              .polygonCapColor(() => '#22c55e')
              .polygonSideColor(() => '#166534')
              .polygonStrokeColor(() => '#15803d')
              .polygonAltitude(0.01);
          })
          .catch((err) => {
            console.error('Failed to load country data:', err);
          });
      };

      requestAnimationFrame(loadCountries);

      // ========================================
      // LIGHTING
      // ========================================
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
      directionalLight.position.set(100, 100, 100);
      scene.add(directionalLight);

      // ========================================
      // MOUSE INTERACTION
      // ========================================
      let isDragging = false;
      let prevMouse = { x: 0, y: 0 };
      let rotationY = -0.3;
      let rotationX = 0.3;
      let autoRotate = true;

      const onPointerDown = (e: PointerEvent) => {
        isDragging = true;
        autoRotate = false;
        prevMouse = { x: e.clientX, y: e.clientY };
        container.style.cursor = 'grabbing';
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        rotationY += dx * 0.005;
        rotationX = Math.max(-1, Math.min(1, rotationX + dy * 0.005));
        prevMouse = { x: e.clientX, y: e.clientY };
      };

      const onPointerUp = () => {
        isDragging = false;
        container.style.cursor = 'grab';
        setTimeout(() => {
          if (!isDragging) autoRotate = true;
        }, 3000);
      };

      container.addEventListener('pointerdown', onPointerDown);
      container.addEventListener('pointermove', onPointerMove);
      container.addEventListener('pointerup', onPointerUp);
      container.addEventListener('pointerleave', onPointerUp);

      // ========================================
      // ANIMATION
      // ========================================
      const animate = () => {
        if (!isInitialized || cleanupCalled) return;
        animationId = requestAnimationFrame(animate);

        if (autoRotate) {
          rotationY += 0.001;
        }

        globe.rotation.y += (rotationY - globe.rotation.y) * 0.05;
        globe.rotation.x += (rotationX - globe.rotation.x) * 0.05;

        renderer!.render(scene, camera);
      };

      requestAnimationFrame(() => {
        if (!cleanupCalled) {
          isInitialized = true;
          setIsLoading(false);
          setIsReady(true);
          animate();
        }
      });
    };

    initGlobe();

    // ========================================
    // CLEANUP
    // ========================================
    return () => {
      cleanupCalled = true;
      isInitialized = false;
      cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [size, isVisible]);

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        style={{
          width: size,
          height: size,
          aspectRatio: '1 / 1',
          cursor: 'grab',
          touchAction: 'none',
          overflow: 'hidden',
          borderRadius: '50%',
        }}
      />
      {isLoading && !isReady && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px',
            fontFamily: 'inherit',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderTopColor: '#3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <span>{loadingText}</span>
        </div>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
