--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3 (Debian 17.3-1.pgdg120+1)
-- Dumped by pg_dump version 17.4 (Ubuntu 17.4-1.pgdg22.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
24569667-e153-4e53-9c0f-82d722a02615	6a4c22a57f8b76f0bf637b57b818f31aec502ba554693ade88dda3e86df05852	2025-03-05 00:13:54.453259+00	20250221202301_init	\N	\N	2025-03-05 00:13:54.414636+00	1
790c9b29-002d-40ef-b074-651829dfe8eb	028cdafa844db431b2dfa62ab4fa7039050d6a2756aabebc1c5d9f14be58817a	2025-03-05 00:13:54.464477+00	20250222173553_init	\N	\N	2025-03-05 00:13:54.455861+00	1
bd8cf227-5ade-4c71-ba71-688c32d995d7	8ae1da853076950fe0fc4297561d82e5afc94aa58cea3c6eaf6416ddbb8e5687	2025-03-05 00:13:54.475617+00	20250222174559_init	\N	\N	2025-03-05 00:13:54.467455+00	1
03fbd4ae-067d-4a61-b1ae-31eb4559adaa	d2a3b9fe1068819810a999412594101c09fe0dc5e5064355f18024cd062bdd3b	2025-03-05 00:13:54.485973+00	20250304225302_ajout_champ_total	\N	\N	2025-03-05 00:13:54.478034+00	1
c7fcee08-a8f4-4fea-9c2c-ef82c3c13b63	99c740faea7d05fbe9dee6da8df0c5bc13126364ba429648218398122674220a	2025-03-05 00:13:54.496812+00	20250304225351_ajout_champ_total	\N	\N	2025-03-05 00:13:54.488662+00	1
d05ee729-be89-4b85-8809-f4996774093a	eb22197ff88efe0d59643bd01a147093a347b59f32d5924b4ebe92649541a53b	2025-03-05 00:13:54.507132+00	20250304225609_ajout_champ_total	\N	\N	2025-03-05 00:13:54.499209+00	1
7d270bb1-8cf8-48e6-ae5a-a1a3d27dfd99	4d426fd82705f86d9acce4b1938421f1f7d3d1417895e93fd6432a245bb1b54c	2025-03-05 00:18:27.6297+00	20250305001827_update	\N	\N	2025-03-05 00:18:27.622264+00	1
\.


--
-- Data for Name: event_type; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.event_type (id, type) FROM stdin;
\.


--
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.event (id, start_date, end_date, title, description, bill, "event_typeId") FROM stdin;
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.item (id, title, description, price, image) FROM stdin;
cuikd1q5s00000gm90pzj72h7	Pull BedBusters	Pull à capuche noir. Design floqué dans le dos et logo floqué sur le cœur	35	/shop/pull
cuikd1q5s00000gm90pzj72h8	Tee-Shirt BedBusters	Tee-Shirt noir floqué du logo de la liste sur le cœur	12	/shop/teeshirt
cuikd1q5s00000gm90pzj72h9	Banane BedBusters	Banane premium noire floquée du logo	8	/shop/banane
cuikd1q5s00000gm90pzj72ha	Bob BedBusters	Bob premium réversible noir floqué du logo	8	/shop/bob
\.


--
-- Data for Name: size; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.size (id, size) FROM stdin;
cuikd1q5s00000gm90pzj72hf	U
cuikd1q5s00000gm90pzj72hb	S
cuikd1q5s00000gm90pzj72hc	M
cuikd1q5s00000gm90pzj72hd	L
cuikd1q5s00000gm90pzj72he	XL
\.


--
-- Data for Name: item_size; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.item_size (id, stock, "itemId", "sizeId") FROM stdin;
cuikd1q5s00000gm90pzj72h1	0	cuikd1q5s00000gm90pzj72h7	cuikd1q5s00000gm90pzj72hb
cuikd1q5s00000gm90pzj72h2	4	cuikd1q5s00000gm90pzj72h7	cuikd1q5s00000gm90pzj72hc
cuikd1q5s00000gm90pzj72h3	3	cuikd1q5s00000gm90pzj72h7	cuikd1q5s00000gm90pzj72hd
cuikd1q5s00000gm90pzj72h4	1	cuikd1q5s00000gm90pzj72h7	cuikd1q5s00000gm90pzj72he
cuikd1q5s00000gm90pzj72h5	1	cuikd1q5s00000gm90pzj72h8	cuikd1q5s00000gm90pzj72hb
cuikd1q5s00000gm90pzj72h6	7	cuikd1q5s00000gm90pzj72h8	cuikd1q5s00000gm90pzj72hc
cuikd1q5s00000gm90pzj72h7	6	cuikd1q5s00000gm90pzj72h8	cuikd1q5s00000gm90pzj72hd
cuikd1q5s00000gm90pzj72h8	1	cuikd1q5s00000gm90pzj72h8	cuikd1q5s00000gm90pzj72he
cuikd1q5s00000gm90pzj72h9	5	cuikd1q5s00000gm90pzj72h9	cuikd1q5s00000gm90pzj72hf
cuikd1q5s00000gm90pzj72ha1	1	cuikd1q5s00000gm90pzj72ha	cuikd1q5s00000gm90pzj72hb
cuikd1q5s00000gm90pzj72ha2	4	cuikd1q5s00000gm90pzj72ha	cuikd1q5s00000gm90pzj72hc
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public."user" (id, first_name, last_name, email, phone) FROM stdin;
cm7yu3zxs0000ox36iwfmq5p8	Thomas	Cadegros	thomas.cadegros@telecom-paris.fr	0695310671
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public."order" (id, status, order_date, "userId", total) FROM stdin;
cm7yu3zy10002ox3629ahitir	PENDING	2025-03-07 13:51:51.48	cm7yu3zxs0000ox36iwfmq5p8	12
\.


--
-- Data for Name: order_item_size; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.order_item_size (id, "orderId", "item_sizeId", quantity) FROM stdin;
cm7yu3zyc0004ox36o08awnfl	cm7yu3zy10002ox3629ahitir	cuikd1q5s00000gm90pzj72h5	1
\.


--
-- PostgreSQL database dump complete
--

