class WebGLRenderer {
    meshes = [];
    shadowMeshes = [];
    lights = [];

    constructor(gl, camera) {
        this.gl = gl;
        this.camera = camera;
    }

    addLight(light) {
        this.lights.push({
            entity: light,
            meshRender: new MeshRender(this.gl, light.mesh, light.mat)
        });
    }
    addMeshRender(mesh) { this.meshes.push(mesh); }
    addShadowMeshRender(mesh) { this.shadowMeshes.push(mesh); }

    render() {
        const gl = this.gl;

        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
        gl.clearDepth(1.0); // Clear everything
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things

        console.assert(this.lights.length != 0, "No light");
        console.assert(this.lights.length == 1, "Multiple lights");

        for (let l = 0; l < this.lights.length; l++) {
            // Draw light
            // TODO: Support all kinds of transform
            this.lights[l].meshRender.mesh.transform.translate = this.lights[l].entity.lightPos;
            this.lights[l].meshRender.draw(this.camera);
           // gl.clearDepth(1.0);
            // Shadow pass
            if (this.lights[l].entity.hasShadowMap == true) {
                for (let i = 0; i < this.shadowMeshes.length; i++) {
                    if(this.shadowMeshes[i].mesh.moveable)
                    {
                        let trans = this.shadowMeshes[i].mesh.transform.translate;
                        let newTrans = [trans[0], trans[1], trans[2] + 0.01];
                        this.shadowMeshes[i].mesh.transform.translate = newTrans;
                        this.shadowMeshes[i].material.updateAttribs(this.lights[l].entity, this.shadowMeshes[i].mesh.transform.translate, this.shadowMeshes[i].mesh.transform.scale);
                        this.shadowMeshes[i].gl.clear(gl.DEPTH_BUFFER_BIT);
                    }
                    this.shadowMeshes[i].draw(this.camera);
                }
            }
            // Camera pass
            for (let i = 0; i < this.meshes.length; i++) {
                this.gl.useProgram(this.meshes[i].shader.program.glShaderProgram);
                this.gl.uniform3fv(this.meshes[i].shader.program.uniforms.uLightPos, this.lights[l].entity.lightPos);
                //console.log(this.meshes[i].mesh.moveable);
                if(this.meshes[i].mesh.moveable)
                {
                    this.meshes[i].material.updateAttribs(this.lights[l].entity, this.meshes[i].mesh.transform.translate, this.meshes[i].mesh.transform.scale);
                    //this.meshes[i].gl.clear(gl.DEPTH_BUFFER_BIT);
                }
                this.meshes[i].draw(this.camera);
            }
        }
    }
}