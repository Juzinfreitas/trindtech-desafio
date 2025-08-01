--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_AlunoCursos_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_AlunoCursos_status" AS ENUM (
    'andamento',
    'concluido'
);


ALTER TYPE public."enum_AlunoCursos_status" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AlunoCursos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AlunoCursos" (
    id integer NOT NULL,
    "alunoId" integer,
    "cursoId" integer,
    status public."enum_AlunoCursos_status",
    "dataConclusao" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AlunoCursos" OWNER TO postgres;

--
-- Name: AlunoCursos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AlunoCursos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AlunoCursos_id_seq" OWNER TO postgres;

--
-- Name: AlunoCursos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AlunoCursos_id_seq" OWNED BY public."AlunoCursos".id;


--
-- Name: Alunos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Alunos" (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    cep character varying(255),
    estado character varying(255),
    cidade character varying(255),
    logradouro character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    sobrenome character varying(255),
    email character varying(255),
    "dataNascimento" date,
    cpf character varying(255),
    genero character varying(255),
    numero character varying(255),
    bairro character varying(255),
    complemento character varying(255),
    pais character varying(255)
);


ALTER TABLE public."Alunos" OWNER TO postgres;

--
-- Name: Alunos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Alunos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Alunos_id_seq" OWNER TO postgres;

--
-- Name: Alunos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Alunos_id_seq" OWNED BY public."Alunos".id;


--
-- Name: Cursos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cursos" (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    descricao character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Cursos" OWNER TO postgres;

--
-- Name: Cursos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cursos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cursos_id_seq" OWNER TO postgres;

--
-- Name: Cursos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cursos_id_seq" OWNED BY public."Cursos".id;


--
-- Name: AlunoCursos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AlunoCursos" ALTER COLUMN id SET DEFAULT nextval('public."AlunoCursos_id_seq"'::regclass);


--
-- Name: Alunos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Alunos" ALTER COLUMN id SET DEFAULT nextval('public."Alunos_id_seq"'::regclass);


--
-- Name: Cursos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cursos" ALTER COLUMN id SET DEFAULT nextval('public."Cursos_id_seq"'::regclass);


--
-- Data for Name: AlunoCursos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AlunoCursos" (id, "alunoId", "cursoId", status, "dataConclusao", "createdAt", "updatedAt") FROM stdin;
1	33	1	andamento	\N	2025-07-24 17:36:27.74+00	2025-07-24 17:36:27.74+00
2	33	2	andamento	\N	2025-07-24 17:49:24.043+00	2025-07-24 17:49:24.043+00
\.


--
-- Data for Name: Alunos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Alunos" (id, nome, cep, estado, cidade, logradouro, "createdAt", "updatedAt", sobrenome, email, "dataNascimento", cpf, genero, numero, bairro, complemento, pais) FROM stdin;
15	Joao Pedro	94180190	RS	Gravata├¡	Rua Quer├¬ncia	2025-07-21 16:27:52.983+00	2025-07-21 16:27:52.983+00	Silva	joaopedro@gmail.com	2000-02-05	12345677890					
28	xavier	94180200	RS	Gravata├¡	Travessa Sobradinho	2025-07-22 19:58:04.647+00	2025-07-22 19:58:04.647+00	da silva	julianosilveirafreitass@gmail.com	2004-07-31	02958203069					
29	lucas	94180200	RS	Gravata├¡	Travessa Sobradinho	2025-07-22 21:49:08.028+00	2025-07-22 21:49:08.028+00	duarte	julianosilveirafreitass@gmail.com	2004-07-31	02958203069					
30	thiago	94180200	RS	Gravata├¡	Travessa Sobradinho	2025-07-22 21:49:28.719+00	2025-07-22 21:49:28.719+00	Silva	julianosilveirafreitass@gmail.com	2004-07-31	02958203069					
33	Juliano	94180200	RS	Gravata├¡	Travessa Sobradinho	2025-07-23 20:42:45.574+00	2025-07-23 20:42:45.574+00	da silva	julianosilveirafreitass@gmail.com	2004-07-31	02958203069					
35	Joao Pedro	94180200	RS	Gravata├¡	Travessa Sobradinho	2025-07-23 20:48:25.831+00	2025-07-23 20:48:25.831+00	Silva	julianosilveirafreitass@gmail.com	2004-07-31	12345677890					
39	felipe	94180200	RS	Gravata├¡	Travessa Sobradinho	2025-07-24 00:59:24.164+00	2025-07-24 00:59:24.164+00	da silva	julianosilveirafreitass@gmail.com	2004-07-31	02958203069					
41	Juliano	94180200	RS	Gravata├¡	Travessa Sobradinho	2025-07-24 16:45:29.227+00	2025-07-24 16:45:29.227+00	Silva	julianosilveirafreitass@gmail.com	2004-07-31	02958203069					
42	Joao Pedro	94180200	RS	Gravata├¡	Travessa Sobradinho	2025-07-24 16:51:07.542+00	2025-07-24 16:51:07.542+00	Silva	julianosilveirafreitass@gmail.com	2004-07-31	02958203069					
\.


--
-- Data for Name: Cursos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cursos" (id, nome, descricao, "createdAt", "updatedAt") FROM stdin;
1	python	\N	2025-07-24 17:36:27.719+00	2025-07-24 17:36:27.719+00
2	node	\N	2025-07-24 17:49:24.029+00	2025-07-24 17:49:24.029+00
\.


--
-- Name: AlunoCursos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AlunoCursos_id_seq"', 2, true);


--
-- Name: Alunos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Alunos_id_seq"', 43, true);


--
-- Name: Cursos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cursos_id_seq"', 2, true);


--
-- Name: AlunoCursos AlunoCursos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AlunoCursos"
    ADD CONSTRAINT "AlunoCursos_pkey" PRIMARY KEY (id);


--
-- Name: Alunos Alunos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Alunos"
    ADD CONSTRAINT "Alunos_pkey" PRIMARY KEY (id);


--
-- Name: Cursos Cursos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cursos"
    ADD CONSTRAINT "Cursos_pkey" PRIMARY KEY (id);


--
-- Name: AlunoCursos AlunoCursos_alunoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AlunoCursos"
    ADD CONSTRAINT "AlunoCursos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES public."Alunos"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AlunoCursos AlunoCursos_cursoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AlunoCursos"
    ADD CONSTRAINT "AlunoCursos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES public."Cursos"(id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

