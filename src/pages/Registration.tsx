/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import { FormDataAlunos } from "@/interfaces/Interface";
import { useData } from "@/context/Context";
import {
  BoxStyleCadastro,
  CamposdeDadosPessoais,
  CamposdeEscolarizacao,
  CamposdeIdentificacao,
  CamposdeMovimentacaoEscolar,
  ListStyle,
  SubtituloDaPagina,
  TituloDaPagina,
  TituloSecaoStyle,
} from "@/utils/contants";
import Image from "next/image";
import logo from "../assets/logo.png";
import MyAppBar from "@/components/NavBar";
export default function CadastroAlunos() {
  const defaultValues = {
    Raça: "", // valor inicial para o campo "Raça"
    ano_fundamental: "",
    turma_em_2023: "",
    movimentacao: "",
    turno: "",
  };
  const { register, handleSubmit, reset, control } = useForm<FormDataAlunos>({
    defaultValues,
  });
  const [isSending, setIsSending] = useState(false);
  const { sendDataToApi } = useData();

  const onSubmit: SubmitHandler<FormDataAlunos> = async (data) => {
    setIsSending(true);
    await sendDataToApi(data);
    alert("estudante cadastrado com sucesso");
    reset();
    setIsSending(false);
  };
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <MyAppBar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={BoxStyleCadastro}>
          <Box sx={{ display: "table", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 -38px",
                padding: "2.5em 52px",
              }}
            >
              <Image src={logo} alt="" height={160} quality={100} priority />
              <Typography sx={TituloDaPagina}>Cadastro de Alunos</Typography>
              <Typography sx={SubtituloDaPagina}>EMEF SANTA CORONA</Typography>
            </Box>
          </Box>
          <List sx={ListStyle}>
            <Typography sx={TituloSecaoStyle}>
              Seção 1 - Identificação do Aluno:
            </Typography>
            <Grid container spacing={2}>
              {CamposdeIdentificacao.map(({ label, id }) => (
                <Grid item xs={12} sm={6} key={id}>
                  <TextField
                    fullWidth
                    id={id}
                    label={label}
                    variant="standard"
                    sx={{
                      borderRadius: "4px",
                    }}
                    required
                    {...register(id as keyof FormDataAlunos)}
                  />
                </Grid>
              ))}
            </Grid>
          </List>

          <List sx={ListStyle}>
            <Typography sx={TituloSecaoStyle}>
              Seção 2 - Dados pessoais do Aluno:
            </Typography>

            <Grid container spacing={2}>
              {CamposdeDadosPessoais.map(({ label, id, type, options }) => (
                <Grid item xs={12} sm={6} key={id}>
                  {type === "select" ? (
                    <Controller
                      name={id as keyof FormDataAlunos}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FormControl fullWidth variant="standard">
                          <InputLabel htmlFor={id}>{label}</InputLabel>
                          <Select label={label} fullWidth id={id} {...field}>
                            <MenuItem value="">
                              <em>Selecione uma opção</em>{" "}
                              {/* Este é o placeholder */}
                            </MenuItem>
                            {options.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      id={id}
                      label={label}
                      variant="standard"
                      sx={{
                        borderRadius: "4px",
                      }}
                      {...register(id as keyof FormDataAlunos)}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </List>

          <List sx={ListStyle}>
            <Typography sx={TituloSecaoStyle}>
              Seção 3 - Dados de Escolarização:
            </Typography>
            <Grid container spacing={2}>
              {CamposdeEscolarizacao.map(({ label, id, type, options }) => (
                <Grid item xs={12} sm={6} key={id}>
                {type === "select" ? (
                  <Controller
                    name={id as keyof FormDataAlunos}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor={id}>{label}</InputLabel>
                        <Select label={label} fullWidth id={id} {...field}>
                          <MenuItem value="">
                            <em>Selecione uma opção</em>{" "}
                            {/* Este é o placeholder */}
                          </MenuItem>
                          {options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                ) : (
                  <TextField
                    fullWidth
                    id={id}
                    label={label}
                    variant="standard"
                    sx={{
                      borderRadius: "4px",
                    }}
                    {...register(id as keyof FormDataAlunos)}
                  />
                )}
              </Grid>
              ))}
            </Grid>
          </List>

          <List sx={ListStyle}>
            <Typography sx={TituloSecaoStyle}>
              Seção 3 - Dados de Movimentação Escolar:
            </Typography>
            <Grid container spacing={2}>
              {CamposdeMovimentacaoEscolar.map(
                ({ label, id, type, options }) => (
                  <Grid item xs={12} sm={6} key={id}>
                  {type === "select" ? (
                    <Controller
                      name={id as keyof FormDataAlunos}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FormControl fullWidth variant="standard">
                          <InputLabel htmlFor={id}>{label}</InputLabel>
                          <Select label={label} fullWidth id={id} {...field}>
                            <MenuItem value="">
                              <em>Selecione uma opção</em>{" "}
                              {/* Este é o placeholder */}
                            </MenuItem>
                            {options.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      id={id}
                      label={label}
                      variant="standard"
                      sx={{
                        borderRadius: "4px",
                      }}
                      {...register(id as keyof FormDataAlunos)}
                    />
                  )}
                </Grid>
                )
              )}
            </Grid>
          </List>
          <Button variant="contained" type="submit" disabled={isSending}>
            {isSending ? "Cadastrando Dados..." : "Cadastrar"}
          </Button>
        </Box>
      </form>
    </Container>
  );
}
