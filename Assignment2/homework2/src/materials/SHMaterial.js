class SHMaterial extends Material {

    constructor(precomputeL, vertexShader, fragmentShader) {
        //let lightMVP = light.CalcLightMVP(translate, scale);
        //let lightIntensity = light.mat.GetIntensity();
        console.log(precomputeL);
        console.log("SHMaterial constructor");
        let lightColor = getMat3ValueFromRGB(precomputeL);
        console.log(lightColor[0][0]);
        console.log(lightColor[0][1]);
        super({
            // SH
            'uPrecomputeLR': { type: 'matrix3fv', value: lightColor[0]},
            'uPrecomputeLG': { type: 'matrix3fv', value: lightColor[1]},
            'uPrecomputeLB': { type: 'matrix3fv', value: lightColor[2]},
           // 'uKs': { type: '3fv', value: specular },
           // 'uLightRadiance': { type: '3fv', value: lightIntensity },

        }, ['aPrecomputeLT'], vertexShader, fragmentShader, null);
    }
}

async function buildSHMaterial(precomputeL, vertexPath, fragmentPath) {

    let vertexShader = await getShaderString(vertexPath);
    let fragmentShader = await getShaderString(fragmentPath);

    return new SHMaterial(precomputeL, vertexShader, fragmentShader);

}
// async function buildSHMaterial2() {

//     console.log("buildSHMaterial!!!!!!");

// }
// async function buildSHMaterial(vertexPath, fragmentPath) {

//     console.log("buildSHMaterial!!!!!!" + vertexPath);
//     let vertexShader = await getShaderString(vertexPath);
//     let fragmentShader = await getShaderString(fragmentPath);

//     return new SHMaterial(vertexShader, fragmentShader);

// }