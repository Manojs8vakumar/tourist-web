import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Compass, MapPin, Sparkles, Navigation } from 'lucide-react';

export default function ThreeTravelGlobe({ onSelectLocation }) {
  const mountRef = useRef(null);
  const [activePin, setActivePin] = useState(null);
  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  // Key curated locations on the 3D globe (lat, lon)
  const locations = [
    { id: 'delhi', name: 'New Delhi (HQ Atelier)', lat: 28.6139, lon: 77.2090, tag: 'India HQ', desc: 'Central Concierge Desk & Executive Operations' },
    { id: 'namakkal', name: 'Namakkal & Tamil Nadu', lat: 11.2189, lon: 78.1674, tag: 'Founder Desk', desc: 'Manoj Sivakumar Concierge • Rock Fort & Temple Corridor' },
    { id: 'rajasthan', name: 'Rajasthan (Jaipur & Udaipur)', lat: 26.9124, lon: 75.7873, tag: 'Royal Heritage', desc: 'Lake Palaces, Desert Camps & Living Forts' },
    { id: 'kashmir', name: 'Kashmir & Gulmarg', lat: 34.0837, lon: 74.7973, tag: 'Himalayan Paradise', desc: 'Cedarwood Houseboats & Alpine Gondolas' },
    { id: 'ladakh', name: 'Ladakh (Pangong & Nubra)', lat: 34.1526, lon: 77.5771, tag: 'High Altitude Moonscape', desc: 'Turquoise Glacial Lakes & Cliff Monasteries' },
    { id: 'kerala', name: 'Kerala Backwaters', lat: 9.4981, lon: 76.3388, tag: 'Coastal Sanctuary', desc: 'Private Kettuvallam Cruises & Ayurvedic Havens' },
    { id: 'agra', name: 'Agra (Taj Mahal)', lat: 27.1767, lon: 78.0081, tag: 'World Wonder', desc: 'Mughal Architecture & Private Dawn Charters' },
    { id: 'varanasi', name: 'Varanasi (Ganges)', lat: 25.3176, lon: 82.9739, tag: 'Spiritual Cradle', desc: 'Aarti Ceremonies & Silk Weaving Guilds' },
    { id: 'goa', name: 'Goa Coastal Villas', lat: 15.2993, lon: 74.1240, tag: 'Ocean Seclusion', desc: 'Portuguese Villas & Private Catamaran Cruises' }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 28);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight1.position.set(20, 25, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x1d4ed8, 1.5);
    dirLight2.position.set(-20, -10, -15);
    scene.add(dirLight2);

    // 4. Globe Core
    const globeRadius = 10;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Initial tilt to center India toward viewer
    globeGroup.rotation.x = 0.25;
    globeGroup.rotation.y = -1.35;

    // Inner globe sphere
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x0a192f,
      emissive: 0x07111e,
      shininess: 40,
      specular: 0x2563eb,
      transparent: true,
      opacity: 0.95
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeMesh);

    // Wireframe Grid Overlay for futuristic luxury feel
    const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(globeRadius * 1.002, 36, 18));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.18
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // Equator & Latitude Rings
    const ringMat = new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.35 });
    [-4, 0, 4].forEach((latOffset) => {
      const ringRadius = Math.sqrt(Math.max(0, globeRadius * globeRadius - latOffset * latOffset));
      const ringGeo = new THREE.BufferGeometry();
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * ringRadius, latOffset, Math.sin(theta) * ringRadius));
      }
      ringGeo.setFromPoints(points);
      const ring = new THREE.Line(ringGeo, ringMat);
      globeGroup.add(ring);
    });

    // Outer Atmosphere Glow
    const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.15, 32, 32);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.15, 0.39, 0.92, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosphere);

    // 5. Starfield & Celestial Particles
    const starCount = 1200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 35 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      // Blue / Silver star shades
      const shade = 0.6 + Math.random() * 0.4;
      starColors[i * 3] = 0.4 * shade;
      starColors[i * 3 + 1] = 0.7 * shade;
      starColors[i * 3 + 2] = 1.0 * shade;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 6. Convert Lat/Lon to 3D Sphere Coordinates
    const latLonToVector3 = (lat, lon, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // 7. Place Location Pins & Glowing Beacons
    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    const pinMeshes = [];
    const pinDataMap = new Map();

    locations.forEach((loc) => {
      const pos = latLonToVector3(loc.lat, loc.lon, globeRadius * 1.01);
      const normal = pos.clone().normalize();

      // Pin base disc
      const discGeo = new THREE.RingGeometry(0.08, 0.28, 16);
      const discMat = new THREE.MeshBasicMaterial({
        color: loc.id === 'namakkal' || loc.id === 'delhi' ? 0x60a5fa : 0x38bdf8,
        side: THREE.DoubleSide
      });
      const disc = new THREE.Mesh(discGeo, discMat);
      disc.position.copy(pos);
      disc.lookAt(pos.clone().add(normal));
      pinGroup.add(disc);

      // Pin tower stem
      const stemHeight = loc.id === 'namakkal' || loc.id === 'delhi' ? 1.4 : 0.9;
      const stemGeo = new THREE.CylinderGeometry(0.04, 0.04, stemHeight, 8);
      const stemMat = new THREE.MeshBasicMaterial({
        color: 0x93c5fd
      });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      const stemPos = pos.clone().add(normal.clone().multiplyScalar(stemHeight / 2));
      stem.position.copy(stemPos);
      stem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      pinGroup.add(stem);

      // Pin Head (Beacon Sphere)
      const headGeo = new THREE.SphereGeometry(loc.id === 'namakkal' ? 0.32 : 0.22, 16, 16);
      const headMat = new THREE.MeshBasicMaterial({
        color: loc.id === 'namakkal' ? 0x38bdf8 : loc.id === 'delhi' ? 0x60a5fa : 0xffffff
      });
      const head = new THREE.Mesh(headGeo, headMat);
      const headPos = pos.clone().add(normal.clone().multiplyScalar(stemHeight));
      head.position.copy(headPos);
      head.userData = { locData: loc };
      pinGroup.add(head);

      pinMeshes.push(head);
      pinDataMap.set(head, loc);
    });

    // 8. Glowing 3D Flight / Route Arcs connecting Hub (Delhi & Namakkal) to other destinations
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    const namakkalPos = latLonToVector3(11.2189, 78.1674, globeRadius * 1.01);
    const delhiPos = latLonToVector3(28.6139, 77.2090, globeRadius * 1.01);

    const createCurvedArc = (startVec, endVec, maxElevation = 2.2) => {
      const midVec = startVec.clone().lerp(endVec, 0.5);
      const midLength = midVec.length();
      midVec.normalize().multiplyScalar(midLength + maxElevation);

      const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.65,
        linewidth: 1.5
      });
      return new THREE.Line(geometry, material);
    };

    locations.forEach((loc) => {
      if (loc.id !== 'delhi' && loc.id !== 'namakkal') {
        const destVec = latLonToVector3(loc.lat, loc.lon, globeRadius * 1.01);
        arcGroup.add(createCurvedArc(delhiPos, destVec, 1.4));
        if (loc.id === 'kerala' || loc.id === 'goa') {
          arcGroup.add(createCurvedArc(namakkalPos, destVec, 1.1));
        }
      }
    });
    // Connect Delhi and Namakkal directly
    arcGroup.add(createCurvedArc(delhiPos, namakkalPos, 2.0));

    // 9. Mouse Drag & Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        globeGroup.rotation.y += deltaX * 0.006;
        globeGroup.rotation.x += deltaY * 0.006;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        // Raycast for hover on pins
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(pinMeshes);
        if (intersects.length > 0) {
          const hoveredLoc = intersects[0].object.userData.locData;
          if (hoveredLoc) {
            setActivePin(hoveredLoc);
            container.style.cursor = 'pointer';
          }
        } else {
          container.style.cursor = isDragging ? 'grabbing' : 'grab';
        }
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onClick = (e) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pinMeshes);
      if (intersects.length > 0) {
        const selected = intersects[0].object.userData.locData;
        if (selected) {
          setActivePin(selected);
          onSelectLocation?.(selected);
        }
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClick);

    // Touch support for mobile
    let touchStart = { x: 0, y: 0 };
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStart.x;
        const deltaY = e.touches[0].clientY - touchStart.y;
        globeGroup.rotation.y += deltaX * 0.007;
        globeGroup.rotation.x += deltaY * 0.007;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    // 10. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Gentle auto-rotation
      if (isRotatingRef.current && !isDragging) {
        globeGroup.rotation.y += 0.0025;
      }

      // Starfield subtle shimmer
      starField.rotation.y += 0.0003;

      // Pulse pin beacons
      const elapsed = clock.getElapsedTime();
      pinMeshes.forEach((mesh, index) => {
        const scale = 1 + 0.15 * Math.sin(elapsed * 3 + index);
        mesh.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    // 11. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('click', onClick);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="three-globe-container">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="globe-canvas-wrapper" />

      {/* Floating 3D HUD / Controls */}
      <div className="globe-hud-bar">
        <div className="hud-status">
          <span className="hud-pulse" />
          <span>Interactive 3D Travel Globe (Subcontinent Hub)</span>
        </div>

        <div className="hud-actions">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`hud-btn ${isRotating ? 'active' : ''}`}
            title={isRotating ? 'Pause Rotation' : 'Resume Auto-Rotate'}
          >
            <RotateCw size={14} className={isRotating ? 'hud-spin' : ''} />
            <span>{isRotating ? 'Auto-Orbiting' : 'Orbit Paused'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Selected Pin Popup Overlay */}
      {activePin && (
        <div className="active-pin-badge animate-fade-in">
          <div className="pin-badge-top">
            <span className="pin-tag">{activePin.tag}</span>
            <button onClick={() => setActivePin(null)} className="pin-close">×</button>
          </div>
          <h4 className="pin-title font-serif">{activePin.name}</h4>
          <p className="pin-desc">{activePin.desc}</p>
          <div className="pin-coords">
            <span>Lat: {activePin.lat.toFixed(2)}° N</span> • <span>Lon: {activePin.lon.toFixed(2)}° E</span>
          </div>
        </div>
      )}

      {/* Drag Hint */}
      <div className="globe-drag-hint">
        <Navigation size={14} />
        <span>Click & drag to rotate globe • Click pins to inspect</span>
      </div>

      <style>{`
        .three-globe-container {
          position: relative;
          width: 100%;
          height: 480px;
          background: radial-gradient(circle at center, #0f2347 0%, #081120 70%, #050b14 100%);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(10, 25, 47, 0.4), inset 0 0 100px rgba(37, 99, 235, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.25);
        }
        .globe-canvas-wrapper {
          width: 100%;
          height: 100%;
          cursor: grab;
        }
        .globe-canvas-wrapper:active {
          cursor: grabbing;
        }
        .globe-hud-bar {
          position: absolute;
          top: 1.25rem;
          left: 1.5rem;
          right: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          pointer-events: none;
          z-index: 10;
        }
        .hud-status {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: rgba(10, 25, 47, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #93c5fd;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.45rem 0.95rem;
          border-radius: 30px;
          pointer-events: auto;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .hud-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
        }
        .hud-actions {
          pointer-events: auto;
        }
        .hud-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(10, 25, 47, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #ffffff;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.45rem 0.95rem;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .hud-btn:hover {
          background: rgba(37, 99, 235, 0.3);
          border-color: #38bdf8;
        }
        .hud-spin {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .active-pin-badge {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          max-width: 340px;
          background: rgba(10, 25, 47, 0.92);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(56, 189, 248, 0.4);
          border-radius: 14px;
          padding: 1.25rem;
          color: #ffffff;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
          z-index: 20;
        }
        .pin-badge-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.45rem;
        }
        .pin-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #38bdf8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .pin-close {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 1.2rem;
          line-height: 1;
          cursor: pointer;
        }
        .pin-close:hover {
          color: #ffffff;
        }
        .pin-title {
          font-size: 1.2rem;
          color: #ffffff;
          margin-bottom: 0.35rem;
        }
        .pin-desc {
          font-size: 0.82rem;
          color: #cbd5e1;
          line-height: 1.5;
          margin-bottom: 0.65rem;
        }
        .pin-coords {
          font-size: 0.72rem;
          color: #94a3b8;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 0.5rem;
        }
        .globe-drag-hint {
          position: absolute;
          bottom: 1.25rem;
          right: 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(10, 25, 47, 0.75);
          color: #94a3b8;
          font-size: 0.75rem;
          padding: 0.35rem 0.85rem;
          border-radius: 20px;
          pointer-events: none;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        @media (max-width: 768px) {
          .three-globe-container {
            height: 460px;
          }
          .active-pin-badge {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
            max-width: none;
          }
          .globe-drag-hint {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
