

COPY public.item (id, title_fr, title_en, description_fr, description_en, price, image) FROM stdin;
cl5y2hx38g7r	Pull Bedbusters	Bedbusters Sweater	Notre magnifique logo sur le Coeur et un design unique dans le dos	Our magnificent logo on the heart and a unique design on the back	35	/shop/pull
cl5y2hx39h8s	Tee-shirt Bedbusters	Bedbusters T-shirt	Notre magnifique logo sur le Coeur	Our magnificent logo on the heart	12	/shop/teeshirt
cl5y2hx40k9t	Bob Bedbusters	Bedbusters Bucket Hat	Un bob stylé pour l'été à notre image	A stylish bucket hat for summer in our image	9	/shop/bob
cl5y2hx41l2u	Banane Bedbusters	Bedbusters Fanny Pack	Un sac indispensable en soirée à notre image	An essential bag for parties in our image	8	/shop/banane
\.


--
-- Data for Name: item_size; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.item_size (id, stock, "itemId", "sizeId") FROM stdin;
cl5y2hx39h8s1000000000000	1	cl5y2hx39h8s	cl5y2hx38g7r
cl5y2hx39h8s3000000000000	6	cl5y2hx39h8s	cl5y2hx40k9t
cl5y2hx39h8s4000000000000	1	cl5y2hx39h8s	cl5y2hx41l2u
cl5y2hx38g7r1000000000000	0	cl5y2hx38g7r	cl5y2hx38g7r
cl5y2hx41l2u1000000000000	1	cl5y2hx40k9t	cl5y2hx38g7r
cl5y2hx39h8s2000000000000	5	cl5y2hx39h8s	cl5y2hx39h8s
cl5y2hx41l2u2000000000000	3	cl5y2hx40k9t	cl5y2hx39h8s
cl5y2hx38g7r4000000000000	0	cl5y2hx38g7r	cl5y2hx41l2u
cl5y2hx40k9t1000000000000	3	cl5y2hx41l2u	cl5y2hx42m3v
cl5y2hx38g7r2000000000000	3	cl5y2hx38g7r	cl5y2hx39h8s
cl5y2hx38g7r3000000000000	2	cl5y2hx38g7r	cl5y2hx40k9t
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
cm8d33ymr0002qnqta6eonmgi	PENDING	2025-03-17 13:12:32.786	cm8d33yji0000qnqtsn86va1j	12
\.


--
-- Data for Name: order_item_size; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.order_item_size (id, "orderId", "item_sizeId", quantity) FROM stdin;
cm835p7gr0004siq7zfpaqzzg	cm835p7eu0002siq7b466830m	cl5y2hx39h8s2000000000000	1
cm837tvk30004nkq0arukjwu4	cm837tvj10002nkq0z9qr1yvl	cl5y2hx39h8s3000000000000	1
cm8381rmh0009nkq0en7e9xox	cm8381rm50007nkq0jkuv36el	cl5y2hx39h8s3000000000000	20
cm83acwut000enkq04e65z1f6	cm83acwui000cnkq0gq52gc8g	cl5y2hx40k9t1000000000000	4
cm84gplfd0004o2q0jeyaggki	cm84gpl980002o2q072lgdwg5	cl5y2hx38g7r4000000000000	1
cm84so5yp0009o2q070j2a40h	cm84so5yb0007o2q0bq03ck9m	cl5y2hx41l2u2000000000000	1
cm84ssevl000eo2q0ysom8u3s	cm84ssev8000co2q0yepw1rjg	cl5y2hx40k9t1000000000000	1
cm84t1m63000jo2q0sewlicbh	cm84t1m4e000ho2q0bn906407	cl5y2hx38g7r4000000000000	1
cm84uakjj000oo2q0yuplrt8k	cm84uakj7000mo2q0blppsuoi	cl5y2hx41l2u1000000000000	1
cm84utnmk000to2q0y2a8ahtt	cm84utnlm000ro2q0bvrko87i	cl5y2hx40k9t1000000000000	1
cm85xfqed000xo2q0trll6dqr	cm85xfqe0000vo2q0hm0g8t0j	cl5y2hx38g7r2000000000000	1
cm88j47rc0012o2q0kiu6qppt	cm88j47r00010o2q0w27pwbit	cl5y2hx38g7r3000000000000	1
cm8d33yr60004qnqt8teepdpr	cm8d33ymr0002qnqta6eonmgi	cl5y2hx39h8s2000000000000	1
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
cm8d33yji0000qnqtsn86va1j	Maël	Messin	mael.messin@telecom-paris.fr	0644029841
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


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

