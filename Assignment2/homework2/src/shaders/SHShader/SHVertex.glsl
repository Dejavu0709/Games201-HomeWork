attribute vec3 aVertexPosition;
attribute vec3 aNormalPosition;
attribute vec2 aTextureCoord;
attribute mat3 aPrecomputeLT;

uniform mat3 uPrecomputeLR;
uniform mat3 uPrecomputeLG;
uniform mat3 uPrecomputeLB;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uLightMVP;

varying highp vec4 vColor;
varying highp vec2 vTextureCoord;
varying highp vec3 vFragPos;
varying highp vec3 vNormal;
varying highp vec4 vPositionFromLight;

void main(void) {

  vFragPos = (uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;
  vNormal = (uModelMatrix * vec4(aNormalPosition, 0.0)).xyz;

  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix *
                vec4(aVertexPosition, 1.0);

  vTextureCoord = aTextureCoord;
  //mat3 rmatrix = dot(uPrecomputeLR, aPrecomputeLT);
  //mat3 gmatrix = dot(uPrecomputeLG, aPrecomputeLT);
  //mat3 bmatrix = dot(uPrecomputeLB, aPrecomputeLT);
  float r,g,b;
  for(int i = 0; i < 3; i++)
  {
   // r += uPrecomputeLR[i][0];
   // g += uPrecomputeLG[i][0];
   // b += uPrecomputeLB[i][0];
    r += dot(uPrecomputeLR[i], aPrecomputeLT[i]);
    g += dot(uPrecomputeLG[i], aPrecomputeLT[i]);
    b += dot(uPrecomputeLB[i], aPrecomputeLT[i]);
  }
  vColor = vec4(1.0 * r,1.0 * g,1.0 * b,1);
  //vPositionFromLight = uLightMVP * vec4(aVertexPosition, 1.0);
}