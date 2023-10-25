import styles from "../dk-common.module.scss";

export default function DKGraphInfo({ lines }) {
  return (
    <>
      <div className={styles.details}>
        {lines.map((line, i) => (
          <details>
            <summary>Stroke {i + 1}</summary>
            <table border={"black"}>
              <tr>
                <td>Stroke</td>
                <td>Point</td>
                <td>X</td>
                <td>Y</td>
                <td>Theta</td>
              </tr>
              {line.points.map((point, j) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{j + 1}</td>
                  <td>{point.x}</td>
                  <td>{point.y}</td>
                  <td>{point.theta}</td>
                </tr>
              ))}
            </table>
          </details>
        ))}
      </div>
    </>
  );
}
