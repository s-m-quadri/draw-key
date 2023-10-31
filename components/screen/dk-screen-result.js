import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function DKScreenResult({
  references,
  allTemplate,
  input,
  allStatus,
}) {
  console.log("References");
  console.log(references);
  return (
    <>
      <Typography variant="h2">Reference Vectors</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Sr.no.</TableCell>
              <TableCell>Vector</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {references.map((signature, si) => {
              return signature.map((vector, vi) => (
                <TableRow key={si * vi}>
                  <TableCell>{vi + 1}</TableCell>
                  <TableCell>{`${vector}`}</TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h2">Template</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Sr. no.</TableCell>
              <TableCell>Minimum Cost</TableCell>
              <TableCell>Maximum Cost</TableCell>
              <TableCell>Minimum Length</TableCell>
              <TableCell>Maximum Length</TableCell>
              <TableCell>Vector</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTemplate.map((template, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{template.costMin}</TableCell>
                <TableCell>{template.costMax}</TableCell>
                <TableCell>{template.lengthMin}</TableCell>
                <TableCell>{template.lengthMax}</TableCell>
                <TableCell>{`${template.vector}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h2">Status</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Sr. no.</TableCell>
              <TableCell>Vector</TableCell>
              <TableCell>Is Verified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allStatus.map((status, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{`${input[i]}`}</TableCell>
                <TableCell>{`${status}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
