export default function DKScreenResult({
  references,
  allTemplate,
  input,
  allStatus,
}) {
  return (
    <>
      <h1>Results Page</h1>
      <h2>Reference Vectors</h2>
      {references.map((signature, si) => (
        <table key={si} border={"black"}>
          <tr>
            <td>Sign: {si + 1}</td>
          </tr>
          {signature.map((vector, vi) => (
            <tr>
              <td>Vector {vi + 1}</td>
              <td>{`${vector}`}</td>
            </tr>
          ))}
        </table>
      ))}

      <h2>Input Vector</h2>
      <table border={"black"}>
        {input.map((vector, vi) => (
          <tr>
            <td>Vector {vi + 1}</td>
            <td>{`${vector}`}</td>
          </tr>
        ))}
      </table>

      <h2>Template</h2>
      {allTemplate.map((template, i) => (
        <table key={i} border={"black"}>
          <tr>
            <td>Vector {i + 1}</td>
          </tr>
          <tr>
            <td>Minimum Cost</td>
            <td>{template.costMin}</td>
          </tr>
          <tr>
            <td>Maximum Cost</td>
            <td>{template.costMax}</td>
          </tr>
          <tr>
            <td>Minimum Length</td>
            <td>{template.lengthMin}</td>
          </tr>
          <tr>
            <td>Maximum Length</td>
            <td>{template.lengthMax}</td>
          </tr>
          <tr>
            <td>Vector</td>
            <td>{`${template.vector}`}</td>
          </tr>
        </table>
      ))}

      <h2>Status</h2>
      <table border={"black"}>
        {allStatus.map((status, i) => (
          <tr key={i}>
            <td>Vector {i + 1}</td>
            <td>{`${status}`}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
