COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8e196e72-c928-4930-976b-dc1a613d0203	6a4c22a57f8b76f0bf637b57b818f31aec502ba554693ade88dda3e86df05852	2025-02-21 20:23:01.125652+00	20250221202301_init	\N	\N	2025-02-21 20:23:01.09621+00	1
0ee88f25-928a-43d2-812e-6d0e43a9c877	028cdafa844db431b2dfa62ab4fa7039050d6a2756aabebc1c5d9f14be58817a	2025-02-22 17:35:53.232762+00	20250222173553_init	\N	\N	2025-02-22 17:35:53.224034+00	1
1906ce21-7a75-43c9-a0e9-f11ba7b84027	8ae1da853076950fe0fc4297561d82e5afc94aa58cea3c6eaf6416ddbb8e5687	2025-02-22 17:45:59.166013+00	20250222174559_init	\N	\N	2025-02-22 17:45:59.158302+00	1
\.


--
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.event (id, start_date, end_date, title, description, bill, "event_typeId") FROM stdin;
\.


--
-- Data for Name: event_type; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.event_type (id, type) FROM stdin;
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.item (id, title, description, price, image) FROM stdin;
cuikd1q5s00000gm90pzj72h7	Pull BedBusters	Pull à capuche noir. Design floqué dans le dos et logo floquée sur le coeur	35	/shop/pull
cuikd1q5s00000gm90pzj72h8	Tee-Shirt BedBusters	Tee-Shirt noir floqué du logo de la liste sur le coeur	12	/shop/teeshirt
cuikd1q5s00000gm90pzj72h9	Banane BedBusters	Banane premium noire floquée du logo	8	/shop/banane
cuikd1q5s00000gm90pzj72ha	Bob BedBusters	Bob premium réversible noire floqué du logo	8	/shop/bob
\.


--
-- Data for Name: item_size; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.item_size (id, stock, "itemId", "sizeId") FROM stdin;
cuikd1q5s00000gm90pzj72hf	0	cuikd1q5s00000gm90pzj72h7	cuikd1q5s00000gm90pzj72hb
cuikd1q5s00000gm90pzj72hg	3	cuikd1q5s00000gm90pzj72h7	cuikd1q5s00000gm90pzj72hc
cuikd1q5s00000gm90pzj72hh	3	cuikd1q5s00000gm90pzj72h7	cuikd1q5s00000gm90pzj72hd
cuikd1q5s00000gm90pzj72hi	1	cuikd1q5s00000gm90pzj72h7	cuikd1q5s00000gm90pzj72he
cuikd1q5s00000gm90pzj72hj	1	cuikd1q5s00000gm90pzj72h8	cuikd1q5s00000gm90pzj72hb
cuikd1q5s00000gm90pzj72hk	7	cuikd1q5s00000gm90pzj72h8	cuikd1q5s00000gm90pzj72hc
cuikd1q5s00000gm90pzj72hl	6	cuikd1q5s00000gm90pzj72h8	cuikd1q5s00000gm90pzj72hd
cuikd1q5s00000gm90pzj72hm	1	cuikd1q5s00000gm90pzj72h8	cuikd1q5s00000gm90pzj72he
cuikd1q5s00000gm90pzj72hn	6	cuikd1q5s00000gm90pzj72h9	cuikd1q5s00000gm90pzj72hb
cuikd1q5s00000gm90pzj72ho	5	cuikd1q5s00000gm90pzj72ha	cuikd1q5s00000gm90pzj72hc
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public."order" (id, status, order_date, payment_date, ship_date, "userId") FROM stdin;
\.


--
-- Data for Name: order_item_size; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.order_item_size (id, "orderId", "item_sizeId") FROM stdin;
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


