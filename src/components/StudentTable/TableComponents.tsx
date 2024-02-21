/* eslint-disable react/display-name */
import React from "react";
import { styled, tableCellClasses, TableCell, TableRow, Link, Typography, PaginationProps, IconButton, Tooltip } from "@mui/material";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './table.module.css'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SearchInputProps, StudentTableProps } from "@/interfaces/Interface";
import { formatDate } from "@/utils/contants";
import { TableCellProps } from '@mui/material/TableCell';
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";



interface StyledTableCellProps extends TableCellProps {
  contentLength: number;
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    minWidth: 100, // Set a minimum width for the header cells
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    minWidth: 100, // Set a minimum width for the body cells
    cursor: 'pointer'
  },
}));


export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 10,
  },
}));

export const StyledTableCellDocumentoText = styled(TableCell)<StyledTableCellProps>(
  ({ theme, contentLength }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      paddingTop: 16,
      paddingLeft: 16,
      paddingBottom: 10,
    },
    // Here we're setting a conditional for when the content's length is greater than 14 characters.
    // If the content is long, we're allowing it to break onto the next line to prevent overflow.
    wordBreak: contentLength > 14 ? 'break-all' : 'normal',
    // You might want to add a minWidth here as suggested, for example:
    minWidth: contentLength > 14 ? '150px' : '100px', // Adjust minimum width based on content length
  })
);



export const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({ value, onChange }) => (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="pesquisar..."
        value={value}
        onChange={onChange}
      />
      <div className={styles.searchIconWrapper}>
        <FontAwesomeIcon
          icon={faSearch}
          size="lg"
          style={{ color: "black" }}
        />
      </div>
    </div>
  )
);




function renderPhoneNumbers(numbers: any): JSX.Element[] {
  // Verifica se numbers é uma string antes de chamar split
  if (typeof numbers !== 'string') {
    // Se não for uma string, retorna um elemento indicando o problema ou lida com a situação de outra forma
    return [<span key="error">Número inválido</span>];
  }

  // Continua como antes se numbers for uma string
  return numbers.split(',').map((numberWithLabel, idx) => {
    const pureNumber = numberWithLabel.replace(/[^0-9]/g, '');
    const isMobile = pureNumber.startsWith("9", 6) || pureNumber.startsWith("9", 5) || pureNumber.startsWith("9", 2);

    return (
      <div key={idx}>
        {isMobile ? (
          <a style={{backgroundColor:"antiquewhite",color:"red"}} href={`https://wa.me/55${pureNumber}`} target="_blank" rel="noopener noreferrer">
            {numberWithLabel}
          </a>
        ) : (
          <span>{numberWithLabel}</span>
        )}
      </div>
    );
  });
}



export const StudentTable: React.FC<StudentTableProps> = React.memo(({ items }) => {
  // Hook para copiar texto
  const [, copyToClipboard] = useCopyToClipboard();

  // Função para manipular o clique, copiando o texto para a área de transferência
  const handleCopyText = (text: string) => {
    copyToClipboard(text).then((success) => {
      if (success) {
        console.log(`Texto "${text}" copiado com sucesso.`);
      } else {
        console.error('Falha ao copiar texto.');
      }
    });
  };

  return (
    <div className={styles.containerTable100} aria-label="Exemplo de tabela responsiva">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>

              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Nome</StyledTableCell>
              <StyledTableCell align="center">Nasc.</StyledTableCell>
              <StyledTableCell align="center">Doc.</StyledTableCell>
              <StyledTableCell align="center">Mãe</StyledTableCell>
              <StyledTableCell align="center">Pai</StyledTableCell>
              <StyledTableCell align="center">Turma</StyledTableCell>
              <StyledTableCell align="center">Fone</StyledTableCell>
              <StyledTableCell align="center">Mov.</StyledTableCell>
              <StyledTableCell align="center">Data.Mov</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <StyledTableRow key={index}>
                {/* Exemplo de célula com texto copiável */}
                <StyledTableCell align="center" onClick={() => handleCopyText(item.id.toString())} component="th" scope="row">
                  {item.id}
                </StyledTableCell>
                <StyledTableCell align="center" onClick={() => handleCopyText(item.nome_do_aluno)}>
                  {item.nome_do_aluno}
                </StyledTableCell>
                <StyledTableCell align="center" onClick={() => handleCopyText(formatDate(item.data_de_nascimento))}>
                  {formatDate(item.data_de_nascimento)}
                </StyledTableCell>
                <StyledTableCell align="center" onClick={() => handleCopyText(item.certidao_cpf_rg)}>
                  {item.certidao_cpf_rg}
                </StyledTableCell>
                <StyledTableCell align="center" onClick={() => handleCopyText(item.mae)}>
                  {item.mae}
                </StyledTableCell>
                <StyledTableCell align="center" onClick={() => handleCopyText(item.pai)}>
                  {item.pai}
                </StyledTableCell>
                <StyledTableCell align="center" onClick={() => handleCopyText(item.turma_em_2024)}>
                  {item.turma_em_2024}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {renderPhoneNumbers(item.telefone)}
                </StyledTableCell>
                <StyledTableCell align="center" onClick={() => handleCopyText(item.movimentacao)}>
                  {item.movimentacao}
                </StyledTableCell>
                <StyledTableCell align="center" onClick={() => handleCopyText(item.data_movimento)}>
                  {formatDate(item.data_movimento)}
                </StyledTableCell>



              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

