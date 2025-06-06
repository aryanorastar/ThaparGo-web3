import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Text, 
  useTexture, 
  Sky, 
  Cloud, 
  Environment, 
  PerspectiveCamera,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';


// Define campus buildings with more details
const campusBuildings = [
  // Academic Blocks
  { 
    id: 'a-block', 
    name: 'A Block', 
    position: [-15, 0, 0], 
    dimensions: [10, 8, 10], 
    color: '#D04848',
    type: 'Academic',
    details: 'Main academic block housing classrooms, labs, and faculty offices.'
  },
  { 
    id: 'b-block', 
    name: 'B Block', 
    position: [-5, 0, 5], 
    dimensions: [10, 6, 10], 
    color: '#F7B787',
    type: 'Academic',
    details: 'Houses computer science and IT departments with specialized labs.'
  },
  { 
    id: 'c-block', 
    name: 'C Block', 
    position: [5, 0, 5], 
    dimensions: [10, 7, 10], 
    color: '#F7B787',
    type: 'Academic',
    details: 'Engineering departments and research facilities.'
  },
  { 
    id: 'd-block', 
    name: 'D Block', 
    position: [15, 0, 0], 
    dimensions: [10, 8, 10], 
    color: '#F7B787',
    type: 'Academic',
    details: 'Lecture halls and seminar rooms.'
  },
  { 
    id: 'e-block', 
    name: 'E Block', 
    position: [15, 0, -10], 
    dimensions: [10, 5, 10], 
    color: '#F7B787',
    type: 'Academic',
    details: 'Administrative offices and faculty chambers.'
  },
  { 
    id: 'h-block', 
    name: 'H Block', 
    position: [5, 0, -10], 
    dimensions: [10, 6, 10], 
    color: '#F7B787',
    type: 'Academic',
    details: 'Science labs and research centers.'
  },
  { 
    id: 'j-block', 
    name: 'J Block', 
    position: [-5, 0, -10], 
    dimensions: [10, 7, 10], 
    color: '#F7B787',
    type: 'Academic',
    details: 'Management and humanities departments.'
  },
  { 
    id: 'library', 
    name: 'Central Library', 
    position: [-15, 0, -10], 
    dimensions: [10, 10, 10], 
    color: '#6499E9',
    type: 'Academic',
    details: 'Main library with study spaces, digital resources, and book collections.'
  },
  
  // Hostels in a row at the back
  { 
    id: 'hostel-a', 
    name: 'Hostel A', 
    position: [-30, 0, -30], 
    dimensions: [8, 12, 8], 
    color: '#A6CF98',
    type: 'Residence',
    details: 'First-year undergraduate student housing with common areas and dining facilities.'
  },
  { 
    id: 'hostel-b', 
    name: 'Hostel B', 
    position: [-20, 0, -30], 
    dimensions: [8, 12, 8], 
    color: '#A6CF98',
    type: 'Residence',
    details: 'Second-year undergraduate student housing.'
  },
  { 
    id: 'hostel-c', 
    name: 'Hostel C', 
    position: [-10, 0, -30], 
    dimensions: [8, 12, 8], 
    color: '#A6CF98',
    type: 'Residence',
    details: 'Third-year undergraduate student housing.'
  },
  { 
    id: 'hostel-d', 
    name: 'Hostel D', 
    position: [0, 0, -30], 
    dimensions: [8, 12, 8], 
    color: '#A6CF98',
    type: 'Residence',
    details: 'Fourth-year undergraduate student housing.'
  },
  { 
    id: 'hostel-e', 
    name: 'Hostel E', 
    position: [10, 0, -30], 
    dimensions: [8, 12, 8], 
    color: '#A6CF98',
    type: 'Residence',
    details: 'Postgraduate student housing.'
  },
  { 
    id: 'hostel-f', 
    name: 'Hostel F', 
    position: [20, 0, -30], 
    dimensions: [8, 12, 8], 
    color: '#A6CF98',
    type: 'Residence',
    details: 'Research scholar and PhD student housing.'
  },
  { 
    id: 'hostel-g', 
    name: 'Hostel G', 
    position: [30, 0, -30], 
    dimensions: [8, 12, 8], 
    color: '#A6CF98',
    type: 'Residence',
    details: 'International student housing with multicultural facilities.'
  },
  { 
    id: 'hostel-j', 
    name: 'J Hostel', 
    position: [-20, 0, 20], 
    dimensions: [10, 8, 10], 
    color: '#F1C93B',
    type: 'Hostel',
    details: 'Male hostel with modern amenities.'
  },
  { 
    id: 'hostel-k', 
    name: 'K Hostel', 
    position: [-10, 0, 20], 
    dimensions: [10, 8, 10], 
    color: '#F1C93B',
    type: 'Hostel',
    details: 'Female hostel with secure access.'
  },
  { 
    id: 'hostel-l', 
    name: 'L Hostel', 
    position: [0, 0, 20], 
    dimensions: [10, 8, 10], 
    color: '#F1C93B',
    type: 'Hostel',
    details: 'Male hostel with recreational facilities.'
  },
  { 
    id: 'hostel-m', 
    name: 'M Hostel', 
    position: [10, 0, 20], 
    dimensions: [10, 8, 10], 
    color: '#F1C93B',
    type: 'Hostel',
    details: 'Female hostel with study lounges.'
  },
  { 
    id: 'hostel-n', 
    name: 'N Hostel', 
    position: [20, 0, 20], 
    dimensions: [10, 8, 10], 
    color: '#F1C93B',
    type: 'Hostel',
    details: 'Newly constructed co-ed hostel.'
  },
  {
    id: 'international-hostel',
    name: 'International Hostel',
    position: [22, 0, 24],
    dimensions: [8, 12, 8],
    color: '#A6CF98',
    type: 'Residence',
    details: 'International student housing with multicultural facilities.'
  },
  
  // Other facilities
  { 
    id: 'cafe', 
    name: 'Cafeteria', 
    position: [0, 0, 15], 
    dimensions: [15, 4, 10], 
    color: '#FFB996',
    type: 'Dining',
    details: 'Main student cafeteria with multiple food options and seating areas.'
  },
  { 
    id: 'mess', 
    name: 'Mess', 
    position: [0, 0, 25], 
    dimensions: [20, 5, 12], 
    color: '#FFCF81',
    type: 'Dining',
    details: 'Student dining hall serving breakfast, lunch, and dinner.'
  },
  { 
    id: 'parking', 
    name: 'Parking Area', 
    position: [25, 0, 25], 
    dimensions: [30, 1, 20], 
    color: '#808080', 
    rotation: Math.PI / 6,
    type: 'Facility',
    details: 'Main parking lot for students, faculty, and visitors.'
  },
  { 
    id: 'sports-complex', 
    name: 'Sports Complex', 
    position: [-25, 0, 15], 
    dimensions: [25, 3, 15], 
    color: '#7FB77E',
    type: 'Facility',
    details: 'Indoor and outdoor sports facilities including gym, swimming pool, and courts.'
  },
  { 
    id: 'auditorium', 
    name: 'Auditorium', 
    position: [25, 0, -15], 
    dimensions: [18, 8, 12], 
    color: '#B1AFFF',
    type: 'Facility',
    details: 'Main auditorium for events, conferences, and performances.'
  },
];

// Ground component with texture
const Ground = () => {
  const texture = useTexture('/placeholder.svg'); // Replace with an actual grass/campus texture
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(100, 100);
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[500, 500]} />
      <meshStandardMaterial 
        map={texture} 
        color="#8BC34A" 
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
};

// Animated marker for points of interest
const LocationMarker = ({ position, color = "#FF5252" }) => {
  const ref = useRef(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.5 + 2;
      ref.current.rotation.y += 0.01;
    }
  });
  
  return (
    <group position={position}>
      <mesh ref={ref} castShadow>
        <cylinderGeometry args={[0.2, 0, 1, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// Clouds for atmosphere
const CloudsGroup = () => {
  return (
    <>
      <Cloud position={[-40, 30, -20]} speed={0.2} opacity={0.7} />
      <Cloud position={[40, 25, 10]} speed={0.1} opacity={0.7} />
      <Cloud position={[0, 35, -40]} speed={0.3} opacity={0.5} />
      <Cloud position={[20, 30, 30]} speed={0.2} opacity={0.6} />
      <Cloud position={[-30, 28, 20]} speed={0.25} opacity={0.5} />
    </>
  );
};

// Building component with animations and interactions
const BuildingMesh = ({ building, isSelected, onClick }) => {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  
  // Animation effects
  useEffect(() => {
    if (!meshRef.current) return;
    
    if (isSelected) {
      gsap.to(meshRef.current.position, {
        y: building.dimensions[1] * 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(meshRef.current.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(meshRef.current.position, {
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [isSelected, building.dimensions]);
  
  // Hover effect
  useEffect(() => {
    if (!meshRef.current) return;
    
    if (hovered && !isSelected) {
      gsap.to(meshRef.current.position, {
        y: building.dimensions[1] * 0.05,
        duration: 0.3,
        ease: "power2.out"
      });
    } else if (!isSelected) {
      gsap.to(meshRef.current.position, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [hovered, isSelected, building.dimensions]);
  
  const buildingColor = useMemo(() => {
    return new THREE.Color(building.color);
  }, [building.color]);
  
  return (
    <group 
      position={[building.position[0], building.position[1], building.position[2]]}
      rotation={[0, building.rotation || 0, 0]}
    >
      <mesh 
        ref={meshRef}
        castShadow 
        receiveShadow
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={building.dimensions} />
        <meshStandardMaterial 
          color={buildingColor} 
          roughness={0.7}
          metalness={0.1}
          emissive={isSelected ? new THREE.Color("#FFFF00") : new THREE.Color(building.color).lerp(new THREE.Color("#FFFFFF"), 0.3)}
          emissiveIntensity={isSelected ? 0.5 : (hovered ? 0.2 : 0)}
        />
      </mesh>
      
      {/* Building label */}
      <Text
        position={[0, building.dimensions[1] + 1, 0]}
        fontSize={1.2}
        color={isSelected ? "#FF0000" : "#000000"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#FFFFFF"
        visible={isSelected || hovered}
      >
        {building.name}
      </Text>
      
      {/* Building info popup when selected */}
      {isSelected && (
        <Html
          position={[0, building.dimensions[1] + 3, 0]}
          distanceFactor={10}
          occlude
        >
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200 w-48 text-xs transform -translate-x-1/2">
            <h3 className="font-bold text-sm mb-1">{building.name}</h3>
            <p className="text-gray-600 mb-1">Type: {building.type}</p>
            {building.details && (
              <p className="text-gray-700">{building.details}</p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

// Roads network
const Roads = () => {
  return (
    <group position={[0, -0.4, 0]}>
      {/* Main horizontal road */}
      <mesh receiveShadow>
        <boxGeometry args={[100, 0.1, 5]} />
        <meshStandardMaterial color="#555555" roughness={1} />
      </mesh>
      
      {/* Main vertical road */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[5, 0.1, 100]} />
        <meshStandardMaterial color="#555555" roughness={1} />
      </mesh>
      
      {/* Connecting roads */}
      <mesh position={[-15, 0, -15]} receiveShadow>
        <boxGeometry args={[30, 0.1, 3]} />
        <meshStandardMaterial color="#555555" roughness={1} />
      </mesh>
      
      <mesh position={[15, 0, -15]} receiveShadow>
        <boxGeometry args={[30, 0.1, 3]} />
        <meshStandardMaterial color="#555555" roughness={1} />
      </mesh>
      
      <mesh position={[0, 0, 20]} receiveShadow>
        <boxGeometry args={[50, 0.1, 3]} />
        <meshStandardMaterial color="#555555" roughness={1} />
      </mesh>
      
      <mesh position={[0, 0, -30]} receiveShadow>
        <boxGeometry args={[80, 0.1, 3]} />
        <meshStandardMaterial color="#555555" roughness={1} />
      </mesh>
    </group>
  );
};

// Trees and vegetation
const Tree = ({ position }) => {
  return (
    <group position={position}>
      {/* Tree trunk */}
      <mesh castShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={1} />
      </mesh>
      
      {/* Tree foliage */}
      <mesh castShadow position={[0, 3, 0]}>
        <coneGeometry args={[1.5, 3, 8]} />
        <meshStandardMaterial color="#2E7D32" roughness={1} />
      </mesh>
    </group>
  );
};

// Trees scattered around campus
const Vegetation = () => {
  // Generate random positions for trees
  const treePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 50; i++) {
      // Avoid placing trees on buildings or roads
      let x = (Math.random() - 0.5) * 100;
      let z = (Math.random() - 0.5) * 100;
      
      // Simple collision detection with buildings
      const tooCloseToBuilding = campusBuildings.some(building => {
        const dx = Math.abs(x - building.position[0]);
        const dz = Math.abs(z - building.position[2]);
        return dx < building.dimensions[0] / 2 + 3 && dz < building.dimensions[2] / 2 + 3;
      });
      
      // Avoid roads
      const onRoad = (
        (Math.abs(x) < 3 && Math.abs(z) < 50) || // Vertical road
        (Math.abs(z) < 3 && Math.abs(x) < 50) || // Horizontal road
        (Math.abs(z - 20) < 2 && Math.abs(x) < 25) || // Connecting road
        (Math.abs(z + 30) < 2 && Math.abs(x) < 40) || // Connecting road
        (Math.abs(z + 15) < 2 && (Math.abs(x - 15) < 15 || Math.abs(x + 15) < 15)) // Other connecting roads
      );
      
      if (!tooCloseToBuilding && !onRoad) {
        positions.push([x, 0, z]);
      }
    }
    return positions;
  }, []);
  
  return (
    <group>
      {treePositions.map((position, index) => (
        <Tree key={index} position={position} />
      ))}
    </group>
  );
};

// Main scene component
const Scene = ({ onBuildingClick, selectedBuildingId }) => {
  const { camera } = useThree();
  
  // Initial camera setup
  useEffect(() => {
    camera.position.set(0, 50, 80);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return (
    <>
      {/* Environment and atmosphere */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[50, 50, 25]} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <Sky distance={450000} sunPosition={[50, 50, 25]} />
      <CloudsGroup />
      <Environment preset="sunset" />
      
      {/* Ground and roads */}
      <Ground />
      <Roads />
      
      {/* Buildings */}
      {campusBuildings.map(building => (
        <BuildingMesh 
          key={building.id}
          building={building}
          isSelected={selectedBuildingId === building.id}
          onClick={() => onBuildingClick(building.id)}
        />
      ))}
      
      {/* Location markers for points of interest */}
      <LocationMarker position={[-15, 0, 0]} color="#FF5252" /> {/* A Block */}
      <LocationMarker position={[-15, 0, -10]} color="#2196F3" /> {/* Library */}
      <LocationMarker position={[0, 0, 15]} color="#FF9800" /> {/* Cafeteria */}
      <LocationMarker position={[-25, 0, 15]} color="#4CAF50" /> {/* Sports Complex */}
      
      {/* Trees and vegetation */}
      <Vegetation />
      
      {/* Camera controls */}
      <OrbitControls 
        enableDamping 
        dampingFactor={0.1}
        minDistance={10}
        maxDistance={150}
        maxPolarAngle={Math.PI / 2 - 0.1} // Prevent going below ground
      />
    </>
  );
};

// Main component
const EnhancedThreeDMap = ({ onBuildingClick, selectedBuildingId }) => {
  return (
    <div className="relative w-full h-[600px] rounded-lg shadow-lg overflow-hidden">
      <Canvas shadows>
        <Scene onBuildingClick={onBuildingClick} selectedBuildingId={selectedBuildingId} />
      </Canvas>
      
      {/* Controls overlay */}
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md">
        <div className="text-xs text-gray-700 mb-2">
          <strong>Controls:</strong><br />
          • Left click + drag<br />
          • Right click + drag<br />
          • Scroll<br />
          • Click on buildings for details<br />
        </div>
      </div>
    </div>
  );
};

export default EnhancedThreeDMap;
