import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export default function Scene3DPostFX() {
  return (
    <EffectComposer multisampling={2}>
      <Bloom luminanceThreshold={0.25} luminanceSmoothing={0.9} intensity={0.5} mipmapBlur />
      <Vignette offset={0.3} darkness={0.5} />
    </EffectComposer>
  );
}
