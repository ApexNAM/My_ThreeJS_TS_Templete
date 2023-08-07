import * as THREE from "three";

export default class Game {
    scene : THREE.Scene;
    camera : THREE.PerspectiveCamera;
    renderer : THREE.WebGLRenderer;

    cube : THREE.Mesh;
    geometry : THREE.BoxGeometry
    material : THREE.MeshBasicMaterial

    
    constructor()
    {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            80,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer();
        this.geometry = new THREE.BoxGeometry();

        this.material = new THREE.MeshBasicMaterial({
            color:0x00ff00,
            wireframe: true,
        });

        this.cube = new THREE.Mesh(this.geometry, this.material);

        this.Init();
    }

    Init() : void
    {
        this.camera.position.z = 2;
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);
        this.scene.add(this.cube);

        window.addEventListener("resize", () => { this.OnWindowResize(); }, false);
    }

    OnWindowResize()
    {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.Draw();
    }

    Run()
    {
        window.requestAnimationFrame(() => {
            this.Run();
        });

        this.Update();
        this.Draw();
    }

    Update()
    {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }

    Draw()
    {
        this.renderer.render(this.scene, this.camera);
    }
}