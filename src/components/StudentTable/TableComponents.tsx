/* eslint-disable react/display-name */
import React from "react";
import { styled, tableCellClasses, TableCell, TableRow, Link, Typography, PaginationProps } from "@mui/material";
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

interface StyledTableCellProps extends TableCellProps {
  contentLength: number;
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledTableCellDocumentoText = styled(TableCell)<StyledTableCellProps>(({ theme, contentLength }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
  // Aplica quebra de linha se o conteúdo for longo
  wordBreak: contentLength > 14 ? 'break-all' : 'normal',
}));

export const StyledTableCellTelefoneText = styled(TableCell)<StyledTableCellProps>(({ theme, contentLength }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
  // Aplica quebra de linha se o conteúdo for longo
  wordBreak: contentLength > 20 ? 'break-all' : 'normal',
}));


export const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({ value, onChange }) => (
    <div  className={styles.searchWrapper}>
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




function renderPhoneNumbers(numbers: string): JSX.Element[] {
  return numbers.split(',').map((numberWithLabel, idx) => {
    // Removendo qualquer caracter não-numérico para criar o link
    const pureNumber = numberWithLabel.replace(/[^0-9]/g, '');

    // Identificando se o número tem 11 dígitos, o que indica ser celular
    const isMobile = pureNumber.startsWith("9",6)||pureNumber.startsWith("9",5)||pureNumber.startsWith("9",2)
  
    // Renderização como link para celulares ou texto normal para outros números
   return (
      <React.Fragment key={idx}>
        {idx > 0 && ', '}
        {isMobile ? (
          <a href={`https://wa.me/55${pureNumber}`} target="_blank" rel="noopener noreferrer">
            {numberWithLabel}
          
          </a>
        ) : (
          <span>{numberWithLabel}</span>
        )}
      </React.Fragment>
    );
  });
}

//certidao_cpf_rg
export const StudentTable: React.FC<StudentTableProps> = React.memo(
  ({ items }) => (
    <div className={styles.containerTable100} aria-label="Exemplo de tabela responsiva">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Nome</StyledTableCell>
               <StyledTableCell align="center">Documento</StyledTableCell>
              <StyledTableCell align="center">Nascimento</StyledTableCell>
              <StyledTableCell align="center">Mãe</StyledTableCell>
              <StyledTableCell align="center">Pai</StyledTableCell>
              <StyledTableCell align="center">Turma</StyledTableCell>
              <StyledTableCell align="center">Telefone</StyledTableCell>
              <StyledTableCell align="center">Movimento</StyledTableCell>
              <StyledTableCell align="center">Data Movimento</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  {item.id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.nome_do_aluno}
                </StyledTableCell>
                 <StyledTableCellDocumentoText align="center" contentLength={item.certidao_cpf_rg.length}>
                  {item.certidao_cpf_rg}
                <StyledTableCellDocumentoText>
                <StyledTableCell align="center">
                  {formatDate(item.data_de_nascimento)}
                </StyledTableCell>
                <StyledTableCell align="center">{item.mae}</StyledTableCell>
                <StyledTableCell align="center">{item.pai}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.turma_em_2023}
                </StyledTableCell>

                <StyledTableCellTelefoneText align="center" contentLength={item.telefone}>
                  {renderPhoneNumbers(item.telefone)}
                </StyledTableCellTelefoneText>

                <StyledTableCell align="center">
                  {item.movimentacao}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(item.data_movimento)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
);


