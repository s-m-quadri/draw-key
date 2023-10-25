export function DKScreenResult({ reference }) {
  return (
    <>
      <h1>Success</h1>
      <h2>Vectors</h2>
      {reference.map((signature, si) =>
        signature.map((vector, vi) => (
          <p key={vi}>
            Sign: {si + 1}: #{vi + 1} {`${vector}`}
          </p>
        ))
      )}
    </>
  );
}
