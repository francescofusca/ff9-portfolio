import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';

/**
 * Globe3D - Minimal 3D globe for portfolio
 * Style: flat colors, soft lighting, professional
 */

interface Globe3DProps {
  size?: number;
}

export function Globe3D({ size = 320 }: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    const container = containerRef.current;
    let animationId: number;
    let isInitialized = false;

    // ========================================
    // SCENE SETUP
    // ========================================
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({
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
    const globe = new ThreeGlobe()
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

    // ========================================
    // MARKER - Apple Maps style pin
    // Cosenza, Calabria, Italy: 39.2988°N, 16.2539°E
    // ========================================
    const COSENZA_LAT = 39.2988;
    const COSENZA_LNG = 16.2539;
    const GLOBE_RADIUS = 100;

    // Convert lat/lng to 3D (geographic coordinate system)
    const latRad = COSENZA_LAT * (Math.PI / 180);
    const lngRad = COSENZA_LNG * (Math.PI / 180);

    const x = GLOBE_RADIUS * Math.cos(latRad) * Math.sin(lngRad);
    const y = GLOBE_RADIUS * Math.sin(latRad);
    const z = GLOBE_RADIUS * Math.cos(latRad) * Math.cos(lngRad);

    // Create marker group
    const markerGroup = new THREE.Group();

    // White border (outer ring)
    const borderGeometry = new THREE.RingGeometry(2.2, 3.2, 32);
    const borderMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      depthTest: false,
    });
    const border = new THREE.Mesh(borderGeometry, borderMaterial);
    border.renderOrder = 998;
    markerGroup.add(border);

    // Blue center
    const centerGeometry = new THREE.CircleGeometry(2.2, 32);
    const centerMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      side: THREE.DoubleSide,
      depthTest: false,
    });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    center.renderOrder = 999;
    markerGroup.add(center);

    // Position above surface
    const normal = new THREE.Vector3(x, y, z).normalize();
    markerGroup.position.set(
      x + normal.x * 2,
      y + normal.y * 2,
      z + normal.z * 2
    );

    // Orient to face outward from globe
    markerGroup.lookAt(normal.x * 200, normal.y * 200, normal.z * 200);

    globe.add(markerGroup);

    // ========================================
    // LOAD COUNTRIES - Deferred to not block main thread
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

    // Defer country loading to next frame
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
    // ANIMATION - Start only once
    // ========================================
    const animate = () => {
      if (!isInitialized) return;
      animationId = requestAnimationFrame(animate);

      if (autoRotate) {
        rotationY += 0.001;
      }

      globe.rotation.y += (rotationY - globe.rotation.y) * 0.05;
      globe.rotation.x += (rotationX - globe.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    // Defer animation start to next frame
    requestAnimationFrame(() => {
      isInitialized = true;
      animate();
    });

    // ========================================
    // CLEANUP
    // ========================================
    return () => {
      isInitialized = false;
      cancelAnimationFrame(animationId);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointerleave', onPointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size, isVisible]);

  return (
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
  );
}
