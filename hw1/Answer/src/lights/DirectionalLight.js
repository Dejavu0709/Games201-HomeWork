class DirectionalLight {

    constructor(lightIntensity, lightColor, lightPos, focalPoint, lightUp, hasShadowMap, gl) {
        this.mesh = Mesh.cube(setTransform(0, 0, 0, 0.2, 0.2, 0.2, 0));
        this.mat = new EmissiveMaterial(lightIntensity, lightColor);
        this.lightPos = lightPos;
        this.focalPoint = focalPoint;
        this.lightUp = lightUp

        this.hasShadowMap = hasShadowMap;
        this.fbo = new FBO(gl);
        if (!this.fbo) {
            console.log("无法设置帧缓冲区对象");
            return;
        }
    }

    CalcLightMVP(translate, scale) {
        let lightMVP = mat4.create();
        let modelMatrix = mat4.create();
        let viewMatrix = mat4.create();
        let projectionMatrix = mat4.create();
        	// Model transform
		mat4.identity(modelMatrix);
		mat4.translate(modelMatrix, modelMatrix, translate);
		mat4.scale(modelMatrix, modelMatrix, scale);
		// View transform
		mat4.lookAt(viewMatrix, this.lightPos, this.focalPoint, this.lightUp);
		// Projection transform


        var l = -100.0;
        var r = 100.0;
        var n = 0.1;
        var f = 1000.0;
        var t = 80.0;
        var b = -80;
        mat4.ortho(projectionMatrix, l,r,b,t,n,f);
        //projectionMatrix= [2/(r - l),0,0,-(r+l)/(r-l),
        //    2/(t - b),0,0,-(t+b)/(t-b),
        //    2/(f - n),0,0,-(f+n)/(f-n),
        //    0,0,0,1];
        　
		//mat4.copy(projectionMatrix, camera.projectionMatrix.elements);
     
        mat4.multiply(lightMVP, projectionMatrix, viewMatrix);
        mat4.multiply(lightMVP, lightMVP, modelMatrix);

        return lightMVP;
    }
}
