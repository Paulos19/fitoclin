"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeIridescentBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Iluminação Botânica (Verde Esmeralda e Amarelo Solar Dourado)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfef08a, 2.8); // Luz solar dourada
    sunLight.position.set(12, 16, 10);
    scene.add(sunLight);

    const emeraldLight = new THREE.DirectionalLight(0x6ee7b7, 2.4); // Esmeralda suave
    emeraldLight.position.set(-14, -8, 8);
    scene.add(emeraldLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 3.5, 30); // Âmbar medicinal
    amberLight.position.set(0, 4, 6);
    scene.add(amberLight);

    // 3. Fundo Shader Botânico Líquido (Ondas de Fitoterapia em Verde e Dourado)
    const bgVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const bgFragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      varying vec2 vUv;

      // Paleta fitoterápica: Verde Esmeralda, Jade, Lima Herbal e Âmbar Solar
      vec3 fitoterapiaPalette(float t) {
        // Base clara orvalhada
        vec3 color0 = vec3(0.96, 0.98, 0.96); // Branco orvalho
        vec3 color1 = vec3(0.58, 0.90, 0.65); // Menta / Esmeralda luminoso
        vec3 color2 = vec3(0.98, 0.84, 0.45); // Dourado solar / Âmbar
        vec3 color3 = vec3(0.40, 0.78, 0.55); // Verde jade herbal

        float f = sin(t * 6.28318) * 0.5 + 0.5;
        float g = cos(t * 3.14159) * 0.5 + 0.5;

        vec3 cA = mix(color0, color1, f);
        vec3 cB = mix(color2, color3, g);
        return mix(cA, cB, 0.35);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
        float d = length(uv);

        // Ondulações orgânicas inspiradas no movimento da água e extratos botânicos
        float wave1 = sin(uv.x * 2.5 + uTime * 0.28) * 0.35;
        float wave2 = cos(uv.y * 2.2 - uTime * 0.22) * 0.35;
        float wave3 = sin(d * 3.8 - uTime * 0.18) * 0.25;
        float combined = wave1 + wave2 + wave3 + d * 0.3;

        vec3 col = fitoterapiaPalette(combined);

        // Vinheta suave nas bordas para reforçar a legibilidade do texto
        col = mix(col, vec3(0.96, 0.98, 0.96), smoothstep(0.3, 1.7, d));

        gl_FragColor = vec4(col, 0.85);
      }
    `;

    const bgUniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };

    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader: bgVertexShader,
      fragmentShader: bgFragmentShader,
      uniforms: bgUniforms,
      depthWrite: false,
    });

    const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMaterial);
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.Camera();
    bgScene.add(bgPlane);

    // 4. Objetos 3D de Vidro Botânico (Torus Esmeralda, Prismas e Cristais Âmbar)
    const glassGroup = new THREE.Group();
    scene.add(glassGroup);

    // Vidro Esmeralda Puro Refrativo
    const emeraldGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x34d399,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.54,
      thickness: 2.5,
      specularIntensity: 1.0,
      specularColor: 0xffffff,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      attenuationColor: new THREE.Color(0x059669),
      attenuationDistance: 1.2,
    });

    // Vidro Âmbar Dourado Solar Refrativo
    const amberGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfbbf24,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.15,
      ior: 1.52,
      thickness: 2.0,
      specularIntensity: 1.0,
      specularColor: 0xffffff,
      clearcoat: 1.0,
      attenuationColor: new THREE.Color(0xd97706),
      attenuationDistance: 1.5,
    });

    // Pérola Botânica translúcida
    const pearlHerbalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdcfce7,
      roughness: 0.22,
      metalness: 0.1,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      transmission: 0.65,
      transparent: true,
      opacity: 0.88,
    });

    // Anel Torus de Vidro Esmeralda (Simboliza renovação 360 e vitalidade)
    const torusGeom = new THREE.TorusGeometry(3.4, 0.75, 32, 64);
    const glassTorus = new THREE.Mesh(torusGeom, emeraldGlassMaterial);
    glassTorus.position.set(-6.5, 3.5, -2);
    glassTorus.rotation.set(0.6, 0.4, 0.2);
    glassGroup.add(glassTorus);

    // Esfera de Vidro Dourada Âmbar (Simboliza energia e saúde)
    const sphereGeom = new THREE.SphereGeometry(2.2, 48, 48);
    const glassSphere = new THREE.Mesh(sphereGeom, amberGlassMaterial);
    glassSphere.position.set(7.5, -2.5, -3);
    glassGroup.add(glassSphere);

    // Prisma Cristalino Octaedro de Fitoterapia
    const octGeom = new THREE.OctahedronGeometry(1.9, 0);
    const glassOctahedron = new THREE.Mesh(octGeom, emeraldGlassMaterial);
    glassOctahedron.position.set(3.5, -6.5, -4);
    glassGroup.add(glassOctahedron);

    // Esferas Flutuantes Menores com Efeito Orvalho
    const pearlSpheres: { mesh: THREE.Mesh; speed: number; offset: number }[] = [];
    const spherePositions = [
      { x: -8.5, y: -4.5, z: -5, r: 1.3, speed: 0.55, offset: 0, mat: pearlHerbalMaterial },
      { x: 5.5, y: 5.5, z: -4, r: 1.0, speed: 0.75, offset: 1.5, mat: amberGlassMaterial },
      { x: 9.5, y: 4.5, z: -6, r: 1.6, speed: 0.45, offset: 2.7, mat: emeraldGlassMaterial },
      { x: -4.5, y: 7.5, z: -5, r: 0.9, speed: 0.65, offset: 4.0, mat: pearlHerbalMaterial },
    ];

    spherePositions.forEach((pos) => {
      const g = new THREE.SphereGeometry(pos.r, 32, 32);
      const m = new THREE.Mesh(g, pos.mat);
      m.position.set(pos.x, pos.y, pos.z);
      glassGroup.add(m);
      pearlSpheres.push({ mesh: m, speed: pos.speed, offset: pos.offset });
    });

    // 5. Interações: Parallax de Mouse & Scroll
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 6. Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      bgUniforms.uResolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 7. Loop de Animação com Desempenho Otimizado
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (document.hidden) return;

      const elapsedTime = clock.getElapsedTime();
      bgUniforms.uTime.value = elapsedTime;

      // Interpolação suave do mouse
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.05;

      // Animação dos objetos 3D botânicos
      glassTorus.rotation.x = 0.6 + elapsedTime * 0.14 + mouseY * 0.2;
      glassTorus.rotation.y = 0.4 + elapsedTime * 0.18 + mouseX * 0.25;
      glassTorus.position.y = 3.5 + Math.sin(elapsedTime * 0.7) * 0.5 - scrollY * 0.002;

      glassSphere.position.y = -2.5 + Math.cos(elapsedTime * 0.8) * 0.4 - scrollY * 0.0025;
      glassSphere.position.x = 7.5 + mouseX * 0.7;

      glassOctahedron.rotation.x = elapsedTime * 0.28;
      glassOctahedron.rotation.y = elapsedTime * 0.22;
      glassOctahedron.position.y = -6.5 + Math.sin(elapsedTime * 0.6 + 1.0) * 0.4 - scrollY * 0.0018;

      pearlSpheres.forEach((p) => {
        p.mesh.position.y += Math.sin(elapsedTime * p.speed + p.offset) * 0.008;
        p.mesh.position.x += Math.cos(elapsedTime * p.speed * 0.7 + p.offset) * 0.005;
      });

      // Rotação suave do grupo com base no mouse
      glassGroup.rotation.y = mouseX * 0.12;
      glassGroup.rotation.x = -mouseY * 0.1;

      // Renderiza shader de fundo e objetos 3D
      renderer.autoClear = false;
      renderer.clear();
      renderer.render(bgScene, bgCamera);
      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      bgMaterial.dispose();
      emeraldGlassMaterial.dispose();
      amberGlassMaterial.dispose();
      pearlHerbalMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-95 transition-opacity duration-1000"
    />
  );
}
