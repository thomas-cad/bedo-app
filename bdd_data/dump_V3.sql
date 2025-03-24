ALTER TABLE public."user" OWNER TO bedbusters_app;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
16c90494-446c-4376-ab32-4b8f7db7e224	6a4c22a57f8b76f0bf637b57b818f31aec502ba554693ade88dda3e86df05852	2025-03-10 10:07:23.955137+00	20250221202301_init	\N	\N	2025-03-10 10:07:23.673393+00	1
59fe4ac5-d6e5-4ec7-afa9-53646155e4e8	028cdafa844db431b2dfa62ab4fa7039050d6a2756aabebc1c5d9f14be58817a	2025-03-10 10:07:24.007633+00	20250222173553_init	\N	\N	2025-03-10 10:07:23.964205+00	1
1034c2e2-8e41-4d43-9c6f-cd750abeed74	8ae1da853076950fe0fc4297561d82e5afc94aa58cea3c6eaf6416ddbb8e5687	2025-03-10 10:07:24.209816+00	20250222174559_init	\N	\N	2025-03-10 10:07:24.015524+00	1
c9db6518-0270-4d76-a49a-7211e0cdfa56	d2a3b9fe1068819810a999412594101c09fe0dc5e5064355f18024cd062bdd3b	2025-03-10 10:07:24.258202+00	20250304225302_ajout_champ_total	\N	\N	2025-03-10 10:07:24.220452+00	1
612603d1-b6de-4d5b-a4b4-4876d70a7c48	99c740faea7d05fbe9dee6da8df0c5bc13126364ba429648218398122674220a	2025-03-10 10:07:24.311901+00	20250304225351_ajout_champ_total	\N	\N	2025-03-10 10:07:24.262687+00	1
08bf13ca-97e9-4ec7-8383-13f983222bef	eb22197ff88efe0d59643bd01a147093a347b59f32d5924b4ebe92649541a53b	2025-03-10 10:07:24.35276+00	20250304225609_ajout_champ_total	\N	\N	2025-03-10 10:07:24.32324+00	1
b8045a4c-9b71-4e1d-a99a-434875a9e634	4d426fd82705f86d9acce4b1938421f1f7d3d1417895e93fd6432a245bb1b54c	2025-03-10 10:07:24.4349+00	20250305001827_update	\N	\N	2025-03-10 10:07:24.364077+00	1
14df1532-7b6a-481e-8499-c7b70ff33289	ede3cc4f31791d18aa47669465bc425147398763ef20bb56b4e2e107035f66aa	\N	20250315195956_order_api	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20250315195956_order_api\n\nDatabase error code: 2BP01\n\nDatabase error:\nERROR: cannot drop column quantity of table order_item_size because other objects depend on it\nDETAIL: view order_view depends on column quantity of table order_item_size\nHINT: Use DROP ... CASCADE to drop the dependent objects too.\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E2BP01), message: "cannot drop column quantity of table order_item_size because other objects depend on it", detail: Some("view order_view depends on column quantity of table order_item_size"), hint: Some("Use DROP ... CASCADE to drop the dependent objects too."), position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("dependency.c"), line: Some(1148), routine: Some("reportDependentObjects") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20250315195956_order_api"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name="20250315195956_order_api"\n             at schema-engine/core/src/commands/apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:225	2025-03-15 20:04:15.323878+00	2025-03-15 19:59:56.979652+00	0
352fd308-f1bd-4cc6-a58b-67b39fb470e3	ede3cc4f31791d18aa47669465bc425147398763ef20bb56b4e2e107035f66aa	2025-03-15 20:04:24.322914+00	20250315195956_order_api	\N	\N	2025-03-15 20:04:24.310493+00	1
\.


--
-- Data for Name: api_user; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.api_user (id, name) FROM stdin;
\.


--
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.event (id, start_date, end_date, title, description, "event_typeId", bill) FROM stdin;
\.


--
-- Data for Name: event_type; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.event_type (id, type) FROM stdin;
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.item (id, title_fr, description_fr, title_en, description_en, price, image) FROM stdin;
cl5y2hx38g7r	Pull Bedbusters	Notre magnifique logo sur le Coeur et un design unique dans le dos	Pull Bedbusters	Our beautiful logo on the heart and a unique design on the back	35	/shop/pull
cl5y2hx39h8s	Tee-shirt Bedbusters	Notre magnifique logo sur le Coeur	Tee-shirt Bedbusters	Our beautiful logo on the heart	12	/shop/teeshirt
cl5y2hx40k9t	Bob Bedbusters	Un bob stylé pour l'été à notre image	Bob Bedbusters	A stylish hat for summer in our image	9	/shop/bob
cl5y2hx41l2u	Banane Bedbusters	Un sac indispensable en soirée à notre image	Banane Bedbusters	An essential bag for parties in our image	8	/shop/banane
\.



--
-- Data for Name: item_size; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.item_size (id, stock, "itemId", "sizeId", preorder) FROM stdin;
cl5y2hx39h8s1000000000000	1	cl5y2hx39h8s	cl5y2hx38g7r	0
cl5y2hx39h8s3000000000000	6	cl5y2hx39h8s	cl5y2hx40k9t	0
cl5y2hx39h8s4000000000000	1	cl5y2hx39h8s	cl5y2hx41l2u	0
cl5y2hx38g7r1000000000000	0	cl5y2hx38g7r	cl5y2hx38g7r	0
cl5y2hx41l2u1000000000000	1	cl5y2hx40k9t	cl5y2hx38g7r	0
cl5y2hx39h8s2000000000000	5	cl5y2hx39h8s	cl5y2hx39h8s	0
cl5y2hx41l2u2000000000000	3	cl5y2hx40k9t	cl5y2hx39h8s	0
cl5y2hx38g7r4000000000000	0	cl5y2hx38g7r	cl5y2hx41l2u	0
cl5y2hx40k9t1000000000000	3	cl5y2hx41l2u	cl5y2hx42m3v	0
cl5y2hx38g7r2000000000000	3	cl5y2hx38g7r	cl5y2hx39h8s	0
cl5y2hx38g7r3000000000000	2	cl5y2hx38g7r	cl5y2hx40k9t	0
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public."order" (id, status, order_date, "userId", total) FROM stdin;
cm835p7eu0002siq7b466830m	CONFIRMED	2025-03-10 14:27:21.413	cm835p7eh0000siq753zr0gpr	12
cm837tvj10002nkq0z9qr1yvl	PENDING	2025-03-10 15:26:58.524	cm837tvip0000nkq0sb25y2hd	12
cm8381rm50007nkq0jkuv36el	PENDING	2025-03-10 15:33:06.7	cm8381rls0005nkq0xrz5q2e8	240
cm83acwui000cnkq0gq52gc8g	PENDING	2025-03-10 16:37:45.929	cm83acwtt000ankq0xfggu1xo	32
cm84gpl980002o2q072lgdwg5	PENDING	2025-03-11 12:23:21.307	cm84gpl6u0000o2q05syvv55e	35
cm84utnlm000ro2q0bvrko87i	PAID	2025-03-11 18:58:25.593	cm84utnla000po2q0fxpdouao	8
cm84uakj7000mo2q0blppsuoi	PAID	2025-03-11 18:43:35.154	cm84uakiv000ko2q0rlqxsqug	9
cm84t1m4e000ho2q0bn906407	PAID	2025-03-11 18:08:37.693	cm84t1m33000fo2q03nnx0oqp	35
cm84ssev8000co2q0yepw1rjg	PAID	2025-03-11 18:01:28.388	cm84sseux000ao2q06dpo0die	8
cm84so5yb0007o2q0bq03ck9m	PAID	2025-03-11 17:58:10.208	cm84so5xx0005o2q0olytdjjj	9
cm85xfqe0000vo2q0hm0g8t0j	CONFIRMED	2025-03-12 12:59:21.047	cm84so5xx0005o2q0olytdjjj	35
cm88j47r00010o2q0w27pwbit	CONFIRMED	2025-03-14 08:41:47.579	cm88j47qn000yo2q0yuvdb69p	35
\.


--
-- Data for Name: order_item_size; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.order_item_size (id, "orderId", "item_sizeId", preorder_quantity, stock_quantity, total_quantity) FROM stdin;
cm835p7gr0004siq7zfpaqzzg	cm835p7eu0002siq7b466830m	cl5y2hx39h8s2000000000000	0	0	0
cm837tvk30004nkq0arukjwu4	cm837tvj10002nkq0z9qr1yvl	cl5y2hx39h8s3000000000000	0	0	0
cm8381rmh0009nkq0en7e9xox	cm8381rm50007nkq0jkuv36el	cl5y2hx39h8s3000000000000	0	0	0
cm83acwut000enkq04e65z1f6	cm83acwui000cnkq0gq52gc8g	cl5y2hx40k9t1000000000000	0	0	0
cm84gplfd0004o2q0jeyaggki	cm84gpl980002o2q072lgdwg5	cl5y2hx38g7r4000000000000	0	0	0
cm84so5yp0009o2q070j2a40h	cm84so5yb0007o2q0bq03ck9m	cl5y2hx41l2u2000000000000	0	0	0
cm84ssevl000eo2q0ysom8u3s	cm84ssev8000co2q0yepw1rjg	cl5y2hx40k9t1000000000000	0	0	0
cm84t1m63000jo2q0sewlicbh	cm84t1m4e000ho2q0bn906407	cl5y2hx38g7r4000000000000	0	0	0
cm84uakjj000oo2q0yuplrt8k	cm84uakj7000mo2q0blppsuoi	cl5y2hx41l2u1000000000000	0	0	0
cm84utnmk000to2q0y2a8ahtt	cm84utnlm000ro2q0bvrko87i	cl5y2hx40k9t1000000000000	0	0	0
cm85xfqed000xo2q0trll6dqr	cm85xfqe0000vo2q0hm0g8t0j	cl5y2hx38g7r2000000000000	0	0	0
cm88j47rc0012o2q0kiu6qppt	cm88j47r00010o2q0w27pwbit	cl5y2hx38g7r3000000000000	0	0	0
\.


--
-- Data for Name: size; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.size (id, size) FROM stdin;
cl5y2hx38g7r	S
cl5y2hx39h8s	M
cl5y2hx40k9t	L
cl5y2hx41l2u	XL
cl5y2hx42m3v	U
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public."user" (id, first_name, last_name, email, phone) FROM stdin;
cm835p7eh0000siq753zr0gpr	Yahya	Moustahsane	yahya.moustahsane@telecom-paris.fr	0767296140
cm837tvip0000nkq0sb25y2hd	test	test	ijosijqsodjq@telecom-paris.fr	0102030405
cm8381rls0005nkq0xrz5q2e8	coucou	au revoir	jesuisunadministrateur@telecom-paris.fr	0000000000
cm83acwtt000ankq0xfggu1xo	Antoine	Huther	antoine.huther@telecom-paris.fr	0628272576
cm84gpl6u0000o2q05syvv55e	Emile	Fourcin	emile.fourcin@telecom-paris.fr	0635383773
cm84sseux000ao2q06dpo0die	Eya	Mami	eya.mami@telecom-paris.fr	0749673964
cm84t1m33000fo2q03nnx0oqp	Mehdi 	El Kouarati 	mehdi.elkouarati@telecom-paris.fr	0783391023
cm84uakiv000ko2q0rlqxsqug	Théo	Lartigau	theo.lartigau@telecom-paris.fr	0641807658
cm84utnla000po2q0fxpdouao	Thomas	Velard	thomas.velard@telecom-paris.fr	0628761365
cm84so5xx0005o2q0olytdjjj	Thomas	Revol	thomas.revol@telecom-paris.fr	0768990496
cm88j47qn000yo2q0yuvdb69p	Mathilde	Duval Alfonso	mathilde.duval@telecom-paris.fr	0782114663
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: api_user api_user_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.api_user
    ADD CONSTRAINT api_user_pkey PRIMARY KEY (id);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- Name: event_type event_type_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.event_type
    ADD CONSTRAINT event_type_pkey PRIMARY KEY (id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- Name: item_size item_size_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.item_size
    ADD CONSTRAINT item_size_pkey PRIMARY KEY (id);


--
-- Name: order_item_size order_item_size_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.order_item_size
    ADD CONSTRAINT order_item_size_pkey PRIMARY KEY (id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: size size_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.size
    ADD CONSTRAINT size_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: api_user_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX api_user_id_key ON public.api_user USING btree (id);


--
-- Name: api_user_name_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX api_user_name_key ON public.api_user USING btree (name);


--
-- Name: event_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX event_id_key ON public.event USING btree (id);


--
-- Name: event_title_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX event_title_key ON public.event USING btree (title);


--
-- Name: event_type_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX event_type_id_key ON public.event_type USING btree (id);


--
-- Name: event_type_type_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX event_type_type_key ON public.event_type USING btree (type);


--
-- Name: item_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX item_id_key ON public.item USING btree (id);


--
-- Name: item_size_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX item_size_id_key ON public.item_size USING btree (id);


--
-- Name: item_title_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX item_title_key ON public.item USING btree (title);


--
-- Name: order_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX order_id_key ON public."order" USING btree (id);


--
-- Name: order_item_size_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX order_item_size_id_key ON public.order_item_size USING btree (id);


--
-- Name: size_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX size_id_key ON public.size USING btree (id);


--
-- Name: size_size_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX size_size_key ON public.size USING btree (size);


--
-- Name: user_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX user_id_key ON public."user" USING btree (id);


--
-- Name: event event_event_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT "event_event_typeId_fkey" FOREIGN KEY ("event_typeId") REFERENCES public.event_type(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: item_size item_size_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.item_size
    ADD CONSTRAINT "item_size_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.item(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: item_size item_size_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.item_size
    ADD CONSTRAINT "item_size_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES public.size(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: order_item_size order_item_size_item_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.order_item_size
    ADD CONSTRAINT "order_item_size_item_sizeId_fkey" FOREIGN KEY ("item_sizeId") REFERENCES public.item_size(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: order_item_size order_item_size_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.order_item_size
    ADD CONSTRAINT "order_item_size_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: order order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

