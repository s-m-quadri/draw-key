import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "../dk-common.module.scss";

export default function DKGraphInfo({ lines }) {
  return (
    <>
      <div className={styles.details}>
        {lines.map((line, i) => (
          <details>
            <summary>Stroke {i + 1}</summary>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Stroke</TableCell>
                    <TableCell>Point</TableCell>
                    <TableCell>X</TableCell>
                    <TableCell>Y</TableCell>
                    <TableCell>Theta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {line.points.map((point, j) => (
                    <TableRow>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{j + 1}</TableCell>
                      <TableCell>{point.x}</TableCell>
                      <TableCell>{point.y}</TableCell>
                      <TableCell>{point.theta}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </details>
        ))}
      </div>
    </>
  );
}
