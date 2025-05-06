'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

export function HrProfessionalModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#e6f0ff'); // Light blue background matching image

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      35, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 1.75, 7);

    // Renderer setup with soft shadows
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    containerRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 9;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 4;
    controls.enablePan = false;
    controls.target.set(0, 1.7, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.update();
    
    // Lighting for soft shadows matching image
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.7);
    mainLight.position.set(2, 6, 4);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 40;
    mainLight.shadow.bias = -0.001;
    mainLight.shadow.radius = 2;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xe6f0ff, 0.4);
    fillLight.position.set(-3, 2, -3);
    scene.add(fillLight);
    
    // Ground shadow (subtle)
    const groundRadius = 1.8;
    const groundGeometry = new THREE.CircleGeometry(groundRadius, 32);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xf0f0f0,
      roughness: 0.8,
      metalness: 0,
      transparent: true,
      opacity: 0.5
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create cartoon businessman exactly like in reference image
    const businessPerson = new THREE.Group();
    
    // Colors matched exactly from image
    const SKIN_COLOR = 0xffd6b5;
    const SHIRT_COLOR = 0x9acbff; // Light blue shirt
    const PANTS_COLOR = 0x14295f; // Dark blue pants
    const TIE_COLOR = 0x14295f;   // Dark blue tie
    const HAIR_COLOR = 0x5a341c;  // Brown hair
    
    // Define body proportions matching the image
    const HEAD_RADIUS = 0.55;
    const BODY_HEIGHT = 2.0;
    const BODY_WIDTH = 1.1;
    const TOTAL_HEIGHT = 3.5;
    
    // Create legs - dark blue pants with perfect cylinder shape
    const legsGroup = new THREE.Group();
    
    const pantsGeometry = new THREE.CylinderGeometry(0.38, 0.5, 1.6, 32);
    const pantsMaterial = new THREE.MeshStandardMaterial({ 
      color: PANTS_COLOR,
      roughness: 0.4,
      metalness: 0.1
    });
    const pants = new THREE.Mesh(pantsGeometry, pantsMaterial);
    pants.position.y = 0.8;
    pants.castShadow = true;
    legsGroup.add(pants);
    
    // Add leg separation line
    const legSeparationGeometry = new THREE.PlaneGeometry(0.02, 1.6);
    const legSeparationMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x0e1d3e,
      side: THREE.DoubleSide
    });
    const legSeparation = new THREE.Mesh(legSeparationGeometry, legSeparationMaterial);
    legSeparation.position.z = 0.39;
    legSeparation.position.y = 0.8;
    legsGroup.add(legSeparation);
    
    // Create black shoes - exact shape from image
    const shoeGeometry = new THREE.CapsuleGeometry(0.2, 0.4, 8, 8);
    const shoeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x111111, 
      roughness: 0.3,
      metalness: 0.3
    });
    
    const leftShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
    leftShoe.position.set(-0.2, 0.18, 0.2);
    leftShoe.rotation.x = Math.PI / 2;
    leftShoe.rotation.z = Math.PI / 24;
    leftShoe.scale.set(0.8, 1, 0.5);
    leftShoe.castShadow = true;
    legsGroup.add(leftShoe);
    
    const rightShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
    rightShoe.position.set(0.2, 0.18, 0.2);
    rightShoe.rotation.x = Math.PI / 2;
    rightShoe.rotation.z = -Math.PI / 24;
    rightShoe.scale.set(0.8, 1, 0.5);
    rightShoe.castShadow = true;
    legsGroup.add(rightShoe);
    
    businessPerson.add(legsGroup);
    
    // Create body - light blue shirt with exact proportions from image
    const torsoGroup = new THREE.Group();
    
    const torsoGeometry = new THREE.CylinderGeometry(0.6, 0.48, 1.4, 32);
    const torsoMaterial = new THREE.MeshStandardMaterial({ 
      color: SHIRT_COLOR,
      roughness: 0.3,
      metalness: 0.1
    });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.y = 1.8;
    torso.castShadow = true;
    torsoGroup.add(torso);
    
    // Add shirt pattern detail - subtle dots
    const shirtPatternTexture = new THREE.CanvasTexture(createShirtPatternTexture());
    shirtPatternTexture.wrapS = THREE.RepeatWrapping;
    shirtPatternTexture.wrapT = THREE.RepeatWrapping;
    shirtPatternTexture.repeat.set(10, 10);
    torso.material.map = shirtPatternTexture;
    
    // Add shirt cuffs at wrists - white bands
    const cuffGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 16);
    const cuffMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.1
    });
    
    const leftCuff = new THREE.Mesh(cuffGeometry, cuffMaterial);
    leftCuff.position.set(-0.8, 1.25, 0);
    leftCuff.castShadow = true;
    torsoGroup.add(leftCuff);
    
    const rightCuff = new THREE.Mesh(cuffGeometry, cuffMaterial);
    rightCuff.position.set(0.8, 1.25, 0);
    rightCuff.castShadow = true;
    torsoGroup.add(rightCuff);
    
    // Add collar - perfect white collar like in image
    const collarGeometry = new THREE.TorusGeometry(0.35, 0.08, 16, 32, Math.PI);
    const collarMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      roughness: 0.3,
      metalness: 0.1
    });
    const collar = new THREE.Mesh(collarGeometry, collarMaterial);
    collar.position.set(0, 2.43, 0.15);
    collar.rotation.x = Math.PI / 2 + Math.PI / 12;
    collar.rotation.z = Math.PI;
    collar.scale.set(1.4, 1, 1);
    collar.castShadow = true;
    torsoGroup.add(collar);
    
    // Add shirt buttons - exactly like in image
    const buttonGeometry = new THREE.CircleGeometry(0.04, 16);
    const buttonMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x14295f,
      roughness: 0.4,
      metalness: 0.3
    });
    
    const topButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    topButton.position.set(0, 2.1, 0.61);
    topButton.rotation.y = Math.PI;
    torsoGroup.add(topButton);
    
    const bottomButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    bottomButton.position.set(0, 1.7, 0.57);
    bottomButton.rotation.y = Math.PI;
    torsoGroup.add(bottomButton);
    
    // Add pocket exactly like in image - on left chest
    const pocketGeometry = new THREE.PlaneGeometry(0.2, 0.25);
    const pocketMaterial = new THREE.MeshStandardMaterial({ 
      color: SHIRT_COLOR,
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide,
      map: shirtPatternTexture
    });
    
    const pocket = new THREE.Mesh(pocketGeometry, pocketMaterial);
    pocket.position.set(0.35, 2.1, 0.62);
    torsoGroup.add(pocket);
    
    // Add pocket edges - subtle detail
    const pocketEdgeGeometry = new THREE.BoxGeometry(0.21, 0.01, 0.01);
    const pocketEdgeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8abaef,
    });
    
    const pocketTopEdge = new THREE.Mesh(pocketEdgeGeometry, pocketEdgeMaterial);
    pocketTopEdge.position.set(0.35, 2.225, 0.625);
    torsoGroup.add(pocketTopEdge);
    
    // Create arms - light blue shirt with correct shape
    const armGeometry = new THREE.CylinderGeometry(0.12, 0.12, 1.3, 16);
    const armMaterial = new THREE.MeshStandardMaterial({ 
      color: SHIRT_COLOR,
      roughness: 0.3,
      metalness: 0.1,
      map: shirtPatternTexture
    });
    
    // Left arm
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.8, 1.8, 0);
    leftArm.rotation.x = -Math.PI * 0.02;
    leftArm.castShadow = true;
    torsoGroup.add(leftArm);
    
    // Right arm
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.8, 1.8, 0);
    rightArm.rotation.x = -Math.PI * 0.02;
    rightArm.castShadow = true;
    torsoGroup.add(rightArm);
    
    // Create hands - skin colored and simple like in image
    const handGeometry = new THREE.SphereGeometry(0.13, 16, 16);
    const handMaterial = new THREE.MeshStandardMaterial({ 
      color: SKIN_COLOR,
      roughness: 0.6,
      metalness: 0.1
    });
    
    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-0.8, 1.15, 0);
    leftHand.scale.set(0.8, 0.5, 0.4);
    leftHand.castShadow = true;
    torsoGroup.add(leftHand);
    
    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(0.8, 1.15, 0);
    rightHand.scale.set(0.8, 0.5, 0.4);
    rightHand.castShadow = true;
    torsoGroup.add(rightHand);
    
    // Add tie - dark blue like in image
    const tieKnotGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.08);
    const tieKnotMaterial = new THREE.MeshStandardMaterial({ 
      color: TIE_COLOR,
      roughness: 0.3,
      metalness: 0.2
    });
    const tieKnot = new THREE.Mesh(tieKnotGeometry, tieKnotMaterial);
    tieKnot.position.set(0, 2.25, 0.59);
    tieKnot.rotation.x = Math.PI * 0.05;
    torsoGroup.add(tieKnot);
    
    const tieGeometry = new THREE.BoxGeometry(0.12, 0.6, 0.05);
    const tieMaterial = new THREE.MeshStandardMaterial({ 
      color: TIE_COLOR,
      roughness: 0.3,
      metalness: 0.2
    });
    const tie = new THREE.Mesh(tieGeometry, tieMaterial);
    tie.position.set(0, 1.95, 0.62);
    tie.rotation.x = Math.PI * 0.05;
    torsoGroup.add(tie);
    
    businessPerson.add(torsoGroup);
    
    // Create head - perfectly rounded like in image
    const headGroup = new THREE.Group();
    
    const headGeometry = new THREE.SphereGeometry(HEAD_RADIUS, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: SKIN_COLOR,
      roughness: 0.5,
      metalness: 0.1
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 3;
    head.castShadow = true;
    headGroup.add(head);
    
    // Add simple eyes - exactly like in image
    const eyeGeometry = new THREE.CircleGeometry(0.035, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 3.05, 0.52);
    leftEye.rotation.y = -0.05;
    headGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 3.05, 0.52);
    rightEye.rotation.y = 0.05;
    headGroup.add(rightEye);
    
    // Add eyebrows - matching image
    const eyebrowGeometry = new THREE.BoxGeometry(0.15, 0.025, 0.01);
    const eyebrowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3a2512
    });
    
    const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    leftEyebrow.position.set(-0.2, 3.15, 0.52);
    leftEyebrow.rotation.x = -Math.PI * 0.05;
    leftEyebrow.rotation.z = Math.PI * 0.1;
    headGroup.add(leftEyebrow);
    
    const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    rightEyebrow.position.set(0.2, 3.15, 0.52);
    rightEyebrow.rotation.x = -Math.PI * 0.05;
    rightEyebrow.rotation.z = -Math.PI * 0.1;
    headGroup.add(rightEyebrow);
    
    // Add nose - subtle like in image
    const noseGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const noseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffd0b5,
      roughness: 0.6,
      metalness: 0.1
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 2.95, 0.52);
    nose.scale.set(0.5, 0.35, 0.5);
    headGroup.add(nose);
    
    // Add mouth - simple smile like in image
    const smileGeometry = new THREE.TorusGeometry(0.12, 0.025, 8, 16, Math.PI);
    const smileMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x333333
    });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.set(0, 2.78, 0.5);
    smile.rotation.x = -Math.PI * 0.1;
    smile.rotation.z = Math.PI;
    headGroup.add(smile);
    
    // Add ears - simple like in image
    const earGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const earMaterial = new THREE.MeshStandardMaterial({ 
      color: SKIN_COLOR,
      roughness: 0.6,
      metalness: 0.1
    });
    
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.54, 3, 0);
    leftEar.scale.set(0.5, 1, 0.7);
    headGroup.add(leftEar);
    
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.54, 3, 0);
    rightEar.scale.set(0.5, 1, 0.7);
    headGroup.add(rightEar);
    
    // Add hair - stylized like in image with the swept look
    const hairMaterial = new THREE.MeshStandardMaterial({ 
      color: HAIR_COLOR,
      roughness: 0.7,
      metalness: 0.1
    });
    
    // Hair base
    const hairBaseGeometry = new THREE.SphereGeometry(0.58, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const hairBase = new THREE.Mesh(hairBaseGeometry, hairMaterial);
    hairBase.position.y = 3.1;
    hairBase.castShadow = true;
    headGroup.add(hairBase);
    
    // Hair front
    const hairFrontGeometry = new THREE.SphereGeometry(0.59, 32, 16, 0, Math.PI, Math.PI * 0.25, Math.PI * 0.25);
    const hairFront = new THREE.Mesh(hairFrontGeometry, hairMaterial);
    hairFront.position.set(0, 3.15, 0.25);
    hairFront.rotation.x = Math.PI * 0.1;
    hairFront.castShadow = true;
    headGroup.add(hairFront);
    
    // Hair top wave
    const hairTopGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const hairTop = new THREE.Mesh(hairTopGeometry, hairMaterial);
    hairTop.position.set(0, 3.4, 0.05);
    hairTop.scale.set(2, 0.5, 1.2);
    headGroup.add(hairTop);
    
    businessPerson.add(headGroup);
    
    // Set the entire figure's position and scale to match the image
    businessPerson.scale.set(0.9, 0.9, 0.9);
    businessPerson.position.y = -0.15;
    businessPerson.rotation.y = Math.PI / 20; // Slight angle like in the image
    scene.add(businessPerson);
    
    // Function to create a subtle pattern texture for the shirt
    function createShirtPatternTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = '#9acbff';
        context.fillRect(0, 0, 128, 128);
        
        context.fillStyle = '#8abcf0';
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * 128;
          const y = Math.random() * 128;
          const radius = Math.random() * 1.5 + 0.5;
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
      return canvas;
    }
    
    // Post-processing for soft look matching image
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Subtle bloom for the soft look in the image
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.12,  // strength - subtle
      0.5,   // radius
      0.8    // threshold
    );
    composer.addPass(bloomPass);

    // FXAA anti-aliasing for smooth edges
    const fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = renderer.getPixelRatio();
    fxaaPass.material.uniforms['resolution'].value.x = 1 / (containerRef.current.offsetWidth * pixelRatio);
    fxaaPass.material.uniforms['resolution'].value.y = 1 / (containerRef.current.offsetHeight * pixelRatio);
    composer.addPass(fxaaPass);

    setLoading(false);

    // Animation loop with very subtle movements like image (static but "alive")
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Natural idle animation that's very subtle
      const time = Date.now() * 0.001;
      
      // Extremely subtle body movement - almost imperceptible like in image
      businessPerson.position.y = -0.15 + Math.sin(time * 0.5) * 0.01;
      
      // Subtle breathing
      torso.scale.z = 1 + Math.sin(time * 1.5) * 0.01;
      
      // Very subtle head movement
      head.rotation.y = Math.sin(time * 0.3) * 0.02;
      
      // Update controls
      controls.update();
      
      // Render with post-processing
      composer.render();
      };
      
      animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      // Update renderer and effects
      renderer.setSize(width, height);
      composer.setSize(width, height);
      
      // Update FXAA
      const pixelRatio = renderer.getPixelRatio();
      fxaaPass.material.uniforms['resolution'].value.x = 1 / (width * pixelRatio);
      fxaaPass.material.uniforms['resolution'].value.y = 1 / (height * pixelRatio);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full" style={{ minHeight: '500px' }}>
      <div 
        ref={containerRef} 
        className="w-full h-full rounded-lg shadow-lg overflow-hidden"
      />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-white font-semibold">Loading 3D Model...</p>
          </div>
        </div>
      )}
    </div>
  );
} 