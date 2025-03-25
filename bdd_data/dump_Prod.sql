--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3 (Debian 17.3-3.pgdg120+1)
-- Dumped by pg_dump version 17.3 (Debian 17.3-3.pgdg120+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: bedbusters_app
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO bedbusters_app;

--
-- Name: item; Type: TABLE; Schema: public; Owner: bedbusters_app
--

CREATE TABLE public.item (
    id text NOT NULL,
    title_fr text NOT NULL,
    description_fr text DEFAULT 'Unknown'::text NOT NULL,
    price double precision NOT NULL,
    image text NOT NULL,
    title_en text DEFAULT 'Unknown'::text NOT NULL,
    description_en text DEFAULT 'Unknown'::text NOT NULL
);


ALTER TABLE public.item OWNER TO bedbusters_app;

--
-- Name: item_size; Type: TABLE; Schema: public; Owner: bedbusters_app
--

CREATE TABLE public.item_size (
    id text NOT NULL,
    stock integer NOT NULL,
    "itemId" text NOT NULL,
    "sizeId" text NOT NULL,
    preorder integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.item_size OWNER TO bedbusters_app;

--
-- Name: membre; Type: TABLE; Schema: public; Owner: bedbusters_app
--

CREATE TABLE public.membre (
    id text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    role_en text DEFAULT 'Member'::text NOT NULL,
    role_fr text DEFAULT 'Membre'::text NOT NULL,
    image text
);


ALTER TABLE public.membre OWNER TO bedbusters_app;

--
-- Name: order; Type: TABLE; Schema: public; Owner: bedbusters_app
--

CREATE TABLE public."order" (
    id text NOT NULL,
    status text NOT NULL,
    order_date timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL,
    total double precision NOT NULL
);


ALTER TABLE public."order" OWNER TO bedbusters_app;

--
-- Name: order_item_size; Type: TABLE; Schema: public; Owner: bedbusters_app
--

CREATE TABLE public.order_item_size (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "item_sizeId" text NOT NULL,
    preorder_quantity integer DEFAULT 0 NOT NULL,
    stock_quantity integer DEFAULT 0 NOT NULL,
    total_quantity integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.order_item_size OWNER TO bedbusters_app;

--
-- Name: pole; Type: TABLE; Schema: public; Owner: bedbusters_app
--

CREATE TABLE public.pole (
    id text NOT NULL,
    name_fr text NOT NULL,
    name_en text NOT NULL,
    description_fr text,
    description_en text,
    show boolean DEFAULT false NOT NULL
);


ALTER TABLE public.pole OWNER TO bedbusters_app;

--
-- Name: pole_membre; Type: TABLE; Schema: public; Owner: bedbusters_app
--

CREATE TABLE public.pole_membre (
    id text NOT NULL,
    "poleId" text NOT NULL,
    "membreId" text NOT NULL,
    respo boolean NOT NULL
);


ALTER TABLE public.pole_membre OWNER TO bedbusters_app;

--
-- Name: size; Type: TABLE; Schema: public; Owner: bedbusters_app
--

CREATE TABLE public.size (
    id text NOT NULL,
    size text NOT NULL
);


ALTER TABLE public.size OWNER TO bedbusters_app;

--
-- Name: user; Type: TABLE; Schema: public; Owner: bedbusters_app
--

CREATE TABLE public."user" (
    id text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."user" OWNER TO bedbusters_app;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7298d5ff-2cd2-406e-aaed-3cd0475fea77	b28efec2c95ff2e4b03ab7c5d098dbf85d4cfdf521d90d05201c9fd58db10f1a	2025-03-24 02:17:25.344795+00	20250324005223_add_respo	\N	\N	2025-03-24 02:17:25.240305+00	1
6e428496-fb87-4259-b5ea-993e930c45f9	6a4c22a57f8b76f0bf637b57b818f31aec502ba554693ade88dda3e86df05852	2025-03-23 23:22:02.071058+00	20250221202301_init	\N	\N	2025-03-23 23:22:02.028431+00	1
80052876-8481-4e53-bb40-7ff4b7bc1c7a	028cdafa844db431b2dfa62ab4fa7039050d6a2756aabebc1c5d9f14be58817a	2025-03-23 23:22:02.114917+00	20250222173553_init	\N	\N	2025-03-23 23:22:02.085442+00	1
98c1df85-f658-44e9-a187-6907d418086a	8ae1da853076950fe0fc4297561d82e5afc94aa58cea3c6eaf6416ddbb8e5687	2025-03-23 23:22:02.165298+00	20250222174559_init	\N	\N	2025-03-23 23:22:02.124971+00	1
1b54e12d-db45-4041-ac6d-59396ac7431c	8e50c04873c1b6861c317d442e7d13209d7bf02543ad96d48c99d06993950ab4	2025-03-24 02:17:25.517445+00	20250324005719_add_image_membre	\N	\N	2025-03-24 02:17:25.354892+00	1
10a09b00-eccb-41b1-a707-a3b8fcd1c3ce	d2a3b9fe1068819810a999412594101c09fe0dc5e5064355f18024cd062bdd3b	2025-03-23 23:22:02.211035+00	20250304225302_ajout_champ_total	\N	\N	2025-03-23 23:22:02.174315+00	1
2892634f-df48-46f5-8d3f-0e9e2e97bc33	99c740faea7d05fbe9dee6da8df0c5bc13126364ba429648218398122674220a	2025-03-23 23:22:02.247458+00	20250304225351_ajout_champ_total	\N	\N	2025-03-23 23:22:02.220408+00	1
1ffc2cde-c31d-4766-a0e7-6f6164a97669	eb22197ff88efe0d59643bd01a147093a347b59f32d5924b4ebe92649541a53b	2025-03-23 23:22:02.283587+00	20250304225609_ajout_champ_total	\N	\N	2025-03-23 23:22:02.257933+00	1
184e323b-fce9-43c1-b337-0cac851c43a9	4d426fd82705f86d9acce4b1938421f1f7d3d1417895e93fd6432a245bb1b54c	2025-03-23 23:22:02.341574+00	20250305001827_update	\N	\N	2025-03-23 23:22:02.293143+00	1
35a794db-4d57-4b3a-b2a3-35743d985d39	ede3cc4f31791d18aa47669465bc425147398763ef20bb56b4e2e107035f66aa	2025-03-23 23:22:02.446318+00	20250315195956_order_api	\N	\N	2025-03-23 23:22:02.36341+00	1
ed34c76c-4420-498c-99f7-6569893fa0fc	b530ac3529db583540b80d1d578a55b75b7a1ddc0a78d4a60610f6e1f5ed1094	2025-03-23 23:22:02.49765+00	20250323003855_en_version_for_items	\N	\N	2025-03-23 23:22:02.473414+00	1
6abc2aad-f535-4209-be96-2b2636db560c	c7ddad8fed64c41349352dfe937f7ea106448ce04ac990cea9eeae76b6686719	2025-03-23 23:22:02.538046+00	20250323010432_fix_description_name	\N	\N	2025-03-23 23:22:02.507203+00	1
dff6fc08-d18b-4b4a-aa34-288b5b335560	cf7f09d75ce1f8190e7f73d312c28cb67dc65024c1148a9917a92b809bf24965	2025-03-23 23:22:02.572121+00	20250323182703_update_user_db	\N	\N	2025-03-23 23:22:02.548342+00	1
6fb4be04-45ea-405c-816f-c7a41bb1858a	543cd02a5c1f54b1f6458a050a6043e796b46bf0eb60343bb0f05dfd2aad8511	2025-03-24 02:17:25.079257+00	20250324000252_membre	\N	\N	2025-03-24 02:17:24.043858+00	1
3d6c0bc5-346b-467a-9e59-8075a1970796	6b6bdde7722c74e5c1de8f95fad5304eb657b8b79a56e8e3c19a5276c913a162	2025-03-24 02:17:25.195624+00	20250324000616_membre	\N	\N	2025-03-24 02:17:25.089887+00	1
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.item (id, title_fr, description_fr, price, image, title_en, description_en) FROM stdin;
cl5y2hx38g7r	Pull Bedbusters	Notre magnifique logo sur le Coeur et un design unique dans le dos	35	/shop/pull	Bedbusters Sweater	Our magnificent logo on the heart and a unique design on the back
cl5y2hx39h8s	Tee-shirt Bedbusters	Notre magnifique logo sur le Coeur	12	/shop/teeshirt	Bedbusters T-shirt	Our magnificent logo on the heart
cl5y2hx40k9t	Bob Bedbusters	Un bob stylé pour l'été à notre image	9	/shop/bob	Bedbusters Bucket Hat	A stylish bucket hat for summer in our image
cl5y2hx41l2u	Banane Bedbusters	Un sac indispensable en soirée à notre image	8	/shop/banane	Bedbusters Fanny Pack	An essential bag for parties in our image
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
-- Data for Name: membre; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.membre (id, first_name, last_name, role_en, role_fr, image) FROM stdin;
cm8mfsxim0000pc6u69brimrh	Carl	Monnaert	Vice-Treasurer	Vice-Trésorier	/image/membre/Carl-Monnaert.jpg
cm8mfsxj00001pc6uhawyytb2	Alessandro	Malaguzzi Valeri	Vice-President	Vice-President	/image/membre/Alessandro-Malaguzzi Valeri.jpg
cm8mfsxjf0002pc6utg8abzee	Jesus Sebastian	Lamas	Member	Membre	/image/membre/Jesus Sebastian-Lamas.jpg
cm8mfsxjs0003pc6uss914o93	Khalil	Jerbi	Member	Membre	/image/membre/Khalil-Jerbi.jpg
cm8mfsxk40004pc6u1j22f8hi	Lylia	Mesa	Member	Membre	/image/membre/Lylia-Mesa.jpg
cm8mfsxkf0005pc6ulbf8ys6n	Thomas	Cadegros	Member	Membre	/image/membre/Thomas-Cadegros.jpg
cm8mfsxkr0006pc6u63w37g9p	Maorine	Pereira	Member	Membre	/image/membre/Maorine-Pereira.jpg
cm8mfsxl50007pc6uwrm4s5ei	Yahya	moustahsane	Member	Membre	/image/membre/Yahya-moustahsane.jpg
cm8mfsxlj0008pc6uadezznkq	Adam	Fayret-Hochart	Member	Membre	/image/membre/Adam-Fayret-Hochart.jpg
cm8mfsxlv0009pc6uu2aagari	Sarah	Azan	Member	Membre	/image/membre/Sarah-Azan.jpg
cm8mfsxn2000apc6uljercvjn	Tara	Dhedin	Member	Membre	/image/membre/Tara-Dhedin.jpg
cm8mfsxnd000bpc6u5nkhbjr9	Theophile	Nadiedjoa	Treasurer	Trésorier	/image/membre/Theophile-Nadiedjoa.jpg
cm8mfsxnn000cpc6uf7ezaz83	Thomas	Revol	Member	President	/image/membre/Thomas-Revol.jpg
cm8mfsxnx000dpc6u14td5cm9	Arnaud	Michel	Member	Membre	/image/membre/Arnaud-Michel.jpg
cm8mfsxo7000epc6ui79qlu2m	Sylvia	Ren	General Secretary	Secrétaire Générale	/image/membre/Sylvia-Ren.jpg
cm8mfsxoc000fpc6ujjvmuisb	Ismail	El Ajraoui	Member	Membre	/image/membre/Ismail-El Ajraoui.jpg
cm8mfsxoh000gpc6uskg9ltga	Aristide	Bailly	Member	Membre	/image/membre/Aristide-Bailly.jpg
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

COPY public.order_item_size (id, "orderId", "item_sizeId", preorder_quantity, stock_quantity, total_quantity) FROM stdin;
cm835p7gr0004siq7zfpaqzzg	cm835p7eu0002siq7b466830m	cl5y2hx39h8s2000000000000	0	1	1
cm837tvk30004nkq0arukjwu4	cm837tvj10002nkq0z9qr1yvl	cl5y2hx39h8s3000000000000	0	1	1
cm8381rmh0009nkq0en7e9xox	cm8381rm50007nkq0jkuv36el	cl5y2hx39h8s3000000000000	0	20	0
cm83acwut000enkq04e65z1f6	cm83acwui000cnkq0gq52gc8g	cl5y2hx40k9t1000000000000	0	4	4
cm84gplfd0004o2q0jeyaggki	cm84gpl980002o2q072lgdwg5	cl5y2hx38g7r4000000000000	0	1	1
cm84so5yp0009o2q070j2a40h	cm84so5yb0007o2q0bq03ck9m	cl5y2hx41l2u2000000000000	0	1	1
cm84ssevl000eo2q0ysom8u3s	cm84ssev8000co2q0yepw1rjg	cl5y2hx40k9t1000000000000	0	1	1
cm84t1m63000jo2q0sewlicbh	cm84t1m4e000ho2q0bn906407	cl5y2hx38g7r4000000000000	0	1	1
cm84uakjj000oo2q0yuplrt8k	cm84uakj7000mo2q0blppsuoi	cl5y2hx41l2u1000000000000	0	1	1
cm84utnmk000to2q0y2a8ahtt	cm84utnlm000ro2q0bvrko87i	cl5y2hx40k9t1000000000000	0	1	1
cm85xfqed000xo2q0trll6dqr	cm85xfqe0000vo2q0hm0g8t0j	cl5y2hx38g7r2000000000000	0	1	1
cm88j47rc0012o2q0kiu6qppt	cm88j47r00010o2q0w27pwbit	cl5y2hx38g7r3000000000000	0	1	1
cm8d33yr60004qnqt8teepdpr	cm8d33ymr0002qnqta6eonmgi	cl5y2hx39h8s2000000000000	0	1	1
\.


--
-- Data for Name: pole; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.pole (id, name_fr, name_en, description_fr, description_en, show) FROM stdin;
cm8mftcv40000pc9d5k2eyr84	Déco	Decoration	\N	\N	f
cm8mftcvi0001pc9dt4nv6lyc	Bureau	Office	\N	\N	f
cm8mftcwf0002pc9d5v21bop3	Présidence	Presidency	\N	\N	f
cm8mftcwq0003pc9djp7xo87f	Trésorerie	Treasury	\N	\N	f
cm8mftcxk0004pc9dljvdx4tg	Secrétariat Général	General Secretariat	\N	\N	f
cm8mftcxx0005pc9dl1is3pik	Accueil	Reception	\N	\N	f
cm8mftcy80006pc9daqc81on0	Agenda	Schedule	\N	\N	f
cm8mftcyj0007pc9dlp92t6e9	Alumni	Alumni	\N	\N	f
cm8mftcyw0008pc9dae3o2abu	Audio-Visuel	Audio-Visual	\N	\N	f
cm8mftd0u0009pc9duv34sh0e	Campagne	Campaign	\N	\N	f
cm8mftd16000apc9dg7pv45t4	Communication	Communication	\N	\N	f
cm8mftd1a000bpc9dw1dqlyx6	Courrier	Mail	\N	\N	f
cm8mftd2i000cpc9dp5iafdzq	Environnement	Environment	\N	\N	f
cm8mftd36000dpc9d0cdp37ha	Foyer	Lounge	\N	\N	f
cm8mftd40000epc9dxr1n9gge	IPP	IPP	\N	\N	f
cm8mftd4c000fpc9db74y6q5y	Infographie	Graphic Design	\N	\N	f
cm8mftd5j000hpc9d0hsznw9x	Intégration des Internationaux	International Integration	\N	\N	f
cm8mftd7h000ipc9d8gsp99fh	Mail	Email	\N	\N	f
cm8mftdb0000jpc9dr16frgqg	Maxi Mardi	Maxi Tuesday	\N	\N	f
cm8mftdbh000kpc9doe7hdjhy	Parrainage	Sponsorship	\N	\N	f
cm8mftdbn000lpc9dp80c51ot	Pots	Gatherings	\N	\N	f
cm8mftddd000mpc9duk0u1u2q	Prévention Alcool	Alcohol Prevention	\N	\N	f
cm8mftdee000npc9d3lgmjchz	Relations Entreprises	Corporate Relations	\N	\N	f
cm8mftdf1000opc9dfp4dz2sq	REC	REC	\N	\N	f
cm8mftdfd000ppc9dmwt78x3x	Repas de Promo	Class Dinner	\N	\N	f
cm8mftdin000qpc9doexsb6np	Réserve Alcool	Alcohol Reserve	\N	\N	f
cm8mftdk6000rpc9donqlknn1	Sécurité	Security	\N	\N	f
cm8mftdn4000spc9dqftn6abf	Textile	Textile	\N	\N	f
cm8mftdpt000tpc9de8m94i7k	WEE	WEE	\N	\N	f
cm8mftdqa000upc9dljru5a5m	WEFA	WEFA	\N	\N	f
cm8mftdty000vpc9dndvq0yd2	WEI	WEI	\N	\N	f
cm8mftdxi000wpc9dl75sp4xq	WES	WES	\N	\N	f
cm8mftd53000gpc9dlql0vgb4	Informatique	IT	Alors vous aimez ?	So do u like it ?	t
\.


--
-- Data for Name: pole_membre; Type: TABLE DATA; Schema: public; Owner: bedbusters_app
--

COPY public.pole_membre (id, "poleId", "membreId", respo) FROM stdin;
cm8mg19vr0001pc687lv4j1mf	cm8mftcv40000pc9d5k2eyr84	cm8mfsxlv0009pc6uu2aagari	t
cm8mg1ao00003pc680eyvp2sz	cm8mftcv40000pc9d5k2eyr84	cm8mfsxkr0006pc6u63w37g9p	f
cm8mg1b2s0005pc688cy6aw4z	cm8mftcv40000pc9d5k2eyr84	cm8mfsxjf0002pc6utg8abzee	f
cm8mg1b340007pc68pfx9cjtq	cm8mftcv40000pc9d5k2eyr84	cm8mfsxk40004pc6u1j22f8hi	f
cm8mg1b7r0009pc68w2ta9clt	cm8mftcvi0001pc9dt4nv6lyc	cm8mfsxnn000cpc6uf7ezaz83	f
cm8mg1bal000bpc68xdwcymhn	cm8mftcvi0001pc9dt4nv6lyc	cm8mfsxj00001pc6uhawyytb2	f
cm8mg1bdc000dpc6819al4jvo	cm8mftcvi0001pc9dt4nv6lyc	cm8mfsxo7000epc6ui79qlu2m	f
cm8mg1bfe000fpc68qwmna09o	cm8mftcvi0001pc9dt4nv6lyc	cm8mfsxim0000pc6u69brimrh	f
cm8mg1bfr000hpc68wp2hxmts	cm8mftcvi0001pc9dt4nv6lyc	cm8mfsxnd000bpc6u5nkhbjr9	f
cm8mg1bgy000jpc68qu1wzhsn	cm8mftcwf0002pc9d5v21bop3	cm8mfsxnn000cpc6uf7ezaz83	f
cm8mg1bjt000lpc681dhu7bde	cm8mftcwf0002pc9d5v21bop3	cm8mfsxj00001pc6uhawyytb2	f
cm8mg1blt000npc68rkknp1cw	cm8mftcwq0003pc9djp7xo87f	cm8mfsxim0000pc6u69brimrh	f
cm8mg1bnh000ppc680v8eyos8	cm8mftcwq0003pc9djp7xo87f	cm8mfsxnd000bpc6u5nkhbjr9	f
cm8mg1bq1000rpc68h9tkz9go	cm8mftcxk0004pc9dljvdx4tg	cm8mfsxo7000epc6ui79qlu2m	f
cm8mg1btf000tpc68ky2hu5oi	cm8mftcxx0005pc9dl1is3pik	cm8mfsxjf0002pc6utg8abzee	f
cm8mg1bvr000vpc68kei3pu5h	cm8mftcxx0005pc9dl1is3pik	cm8mfsxnn000cpc6uf7ezaz83	f
cm8mg1by9000xpc68xqrrmp39	cm8mftcy80006pc9daqc81on0	cm8mfsxo7000epc6ui79qlu2m	t
cm8mg1bys000zpc68m7e592pr	cm8mftcy80006pc9daqc81on0	cm8mfsxn2000apc6uljercvjn	f
cm8mg1bz80011pc681p1m885r	cm8mftcyj0007pc9dlp92t6e9	cm8mfsxoh000gpc6uskg9ltga	t
cm8mg1c350013pc68revkzijh	cm8mftcyj0007pc9dlp92t6e9	cm8mfsxnn000cpc6uf7ezaz83	f
cm8mg1c5r0015pc683oncfv91	cm8mftcyj0007pc9dlp92t6e9	cm8mfsxo7000epc6ui79qlu2m	f
cm8mg1c6d0017pc68zprm3kju	cm8mftcyj0007pc9dlp92t6e9	cm8mfsxjs0003pc6uss914o93	f
cm8mg1cai0019pc687k493v97	cm8mftcyw0008pc9dae3o2abu	cm8mfsxlv0009pc6uu2aagari	f
cm8mg1cec001bpc682w0w18n4	cm8mftcyw0008pc9dae3o2abu	cm8mfsxk40004pc6u1j22f8hi	f
cm8mg1cg0001dpc68ricmg14v	cm8mftcyw0008pc9dae3o2abu	cm8mfsxo7000epc6ui79qlu2m	f
cm8mg1cge001fpc68fxzejcnt	cm8mftd0u0009pc9duv34sh0e	cm8mfsxl50007pc6uwrm4s5ei	t
cm8mg1cgt001hpc682raukrjt	cm8mftd0u0009pc9duv34sh0e	cm8mfsxlj0008pc6uadezznkq	f
cm8mg1ch8001jpc68bcwy7kx9	cm8mftd0u0009pc9duv34sh0e	cm8mfsxkf0005pc6ulbf8ys6n	f
cm8mg1cho001lpc68p61zgqvq	cm8mftd0u0009pc9duv34sh0e	cm8mfsxjf0002pc6utg8abzee	f
cm8mg1ci6001npc68kbum7swa	cm8mftd0u0009pc9duv34sh0e	cm8mfsxk40004pc6u1j22f8hi	f
cm8mg1cj1001ppc68kzund4cd	cm8mftd16000apc9dg7pv45t4	cm8mfsxoh000gpc6uskg9ltga	t
cm8mg1cjc001rpc68fcd1robs	cm8mftd16000apc9dg7pv45t4	cm8mfsxlv0009pc6uu2aagari	f
cm8mg1cjz001tpc68b5qmqv2l	cm8mftd16000apc9dg7pv45t4	cm8mfsxjs0003pc6uss914o93	f
cm8mg1cka001vpc68ewh3e2s1	cm8mftd1a000bpc9dw1dqlyx6	cm8mfsxkr0006pc6u63w37g9p	t
cm8mg1ckq001xpc687667vjlg	cm8mftd2i000cpc9dp5iafdzq	cm8mfsxj00001pc6uhawyytb2	f
cm8mg1cl2001zpc683yj0n1bd	cm8mftd2i000cpc9dp5iafdzq	cm8mfsxn2000apc6uljercvjn	t
cm8mg1clf0021pc68js0vnjpk	cm8mftd36000dpc9d0cdp37ha	cm8mfsxnd000bpc6u5nkhbjr9	f
cm8mg1cm80023pc68wehm40nc	cm8mftd36000dpc9d0cdp37ha	cm8mfsxlj0008pc6uadezznkq	f
cm8mg1cmc0025pc68llqos8xf	cm8mftd36000dpc9d0cdp37ha	cm8mfsxnx000dpc6u14td5cm9	t
cm8mg1cng0027pc68nh43vvbj	cm8mftd40000epc9dxr1n9gge	cm8mfsxoh000gpc6uskg9ltga	t
cm8mg1cnq0029pc68rviio2uk	cm8mftd40000epc9dxr1n9gge	cm8mfsxnx000dpc6u14td5cm9	f
cm8mg1coa002bpc68ba5jjjzv	cm8mftd40000epc9dxr1n9gge	cm8mfsxo7000epc6ui79qlu2m	f
cm8mg1cop002dpc68o0nb2usk	cm8mftd40000epc9dxr1n9gge	cm8mfsxnn000cpc6uf7ezaz83	f
cm8mg1cp2002fpc680otzfl4r	cm8mftd4c000fpc9db74y6q5y	cm8mfsxlv0009pc6uu2aagari	f
cm8mg1cpf002hpc68lezw416o	cm8mftd4c000fpc9db74y6q5y	cm8mfsxo7000epc6ui79qlu2m	f
cm8mg1cps002jpc68iet5er1i	cm8mftd4c000fpc9db74y6q5y	cm8mfsxk40004pc6u1j22f8hi	f
cm8mg1cq5002lpc68hu8s8p30	cm8mftd53000gpc9dlql0vgb4	cm8mfsxkf0005pc6ulbf8ys6n	t
cm8mg1cqq002npc68ymyce1qw	cm8mftd53000gpc9dlql0vgb4	cm8mfsxnx000dpc6u14td5cm9	f
cm8mg1cra002ppc689c5edspb	cm8mftd53000gpc9dlql0vgb4	cm8mfsxl50007pc6uwrm4s5ei	f
cm8mg1crm002rpc68pl741rwv	cm8mftd5j000hpc9d0hsznw9x	cm8mfsxjf0002pc6utg8abzee	t
cm8mg1cs5002tpc68welg9vjs	cm8mftd5j000hpc9d0hsznw9x	cm8mfsxnx000dpc6u14td5cm9	t
cm8mg1cst002vpc68bqw4e8u5	cm8mftd5j000hpc9d0hsznw9x	cm8mfsxjs0003pc6uss914o93	t
cm8mg1csy002xpc68d11awoyl	cm8mftd5j000hpc9d0hsznw9x	cm8mfsxkr0006pc6u63w37g9p	f
cm8mg1ct4002zpc68rxw7x7mg	cm8mftd7h000ipc9d8gsp99fh	cm8mfsxkr0006pc6u63w37g9p	t
cm8mg1ctf0031pc68estbkxrv	cm8mftdb0000jpc9dr16frgqg	cm8mfsxnx000dpc6u14td5cm9	f
cm8mg1ctk0033pc680zydj2q8	cm8mftdb0000jpc9dr16frgqg	cm8mfsxkr0006pc6u63w37g9p	t
cm8mg1cur0035pc68nvlbjfm0	cm8mftdb0000jpc9dr16frgqg	cm8mfsxj00001pc6uhawyytb2	f
cm8mg1cv30037pc68glh5pd3o	cm8mftdbh000kpc9doe7hdjhy	cm8mfsxim0000pc6u69brimrh	f
cm8mg1cve0039pc68sd6w7kqw	cm8mftdbh000kpc9doe7hdjhy	cm8mfsxnd000bpc6u5nkhbjr9	f
cm8mg1cvu003bpc68ob7mhlh6	cm8mftdbh000kpc9doe7hdjhy	cm8mfsxoc000fpc6ujjvmuisb	t
cm8mg1cw8003dpc68j91a2el5	cm8mftdbn000lpc9dp80c51ot	cm8mfsxl50007pc6uwrm4s5ei	f
cm8mg1cxe003fpc68v50apdk1	cm8mftdbn000lpc9dp80c51ot	cm8mfsxoc000fpc6ujjvmuisb	f
cm8mg1cxq003hpc68ires513o	cm8mftdbn000lpc9dp80c51ot	cm8mfsxoh000gpc6uskg9ltga	f
cm8mg1cy2003jpc68n43wkal4	cm8mftdbn000lpc9dp80c51ot	cm8mfsxlj0008pc6uadezznkq	t
cm8mg1d04003lpc68jhvgg2xl	cm8mftddd000mpc9duk0u1u2q	cm8mfsxlj0008pc6uadezznkq	t
cm8mg1d0t003npc68f1srxr04	cm8mftddd000mpc9duk0u1u2q	cm8mfsxoc000fpc6ujjvmuisb	t
cm8mg1d17003ppc68v2ki7bci	cm8mftdee000npc9d3lgmjchz	cm8mfsxkf0005pc6ulbf8ys6n	f
cm8mg1d1k003rpc68xzcdbxze	cm8mftdee000npc9d3lgmjchz	cm8mfsxnn000cpc6uf7ezaz83	t
cm8mg1d1v003tpc68lvgtry8p	cm8mftdee000npc9d3lgmjchz	cm8mfsxim0000pc6u69brimrh	f
cm8mg1d3i003vpc68u730nmms	cm8mftdee000npc9d3lgmjchz	cm8mfsxj00001pc6uhawyytb2	f
cm8mg1d3u003xpc688ybajfhd	cm8mftdee000npc9d3lgmjchz	cm8mfsxo7000epc6ui79qlu2m	f
cm8mg1d45003zpc68qmk0gdt9	cm8mftdee000npc9d3lgmjchz	cm8mfsxoh000gpc6uskg9ltga	f
cm8mg1d4h0041pc68d9k30cxu	cm8mftdf1000opc9dfp4dz2sq	cm8mfsxn2000apc6uljercvjn	f
cm8mg1d4v0043pc686ot8o6r7	cm8mftdf1000opc9dfp4dz2sq	cm8mfsxj00001pc6uhawyytb2	f
cm8mg1d590045pc68y1hvdek5	cm8mftdf1000opc9dfp4dz2sq	cm8mfsxo7000epc6ui79qlu2m	f
cm8mg1d5l0047pc68a5fp0vty	cm8mftdf1000opc9dfp4dz2sq	cm8mfsxoc000fpc6ujjvmuisb	f
cm8mg1d5x0049pc68err09nds	cm8mftdfd000ppc9dmwt78x3x	cm8mfsxnd000bpc6u5nkhbjr9	t
cm8mg1d75004bpc68nij6iq6x	cm8mftdfd000ppc9dmwt78x3x	cm8mfsxkr0006pc6u63w37g9p	f
cm8mg1d7h004dpc68q5b5l58k	cm8mftdfd000ppc9dmwt78x3x	cm8mfsxoc000fpc6ujjvmuisb	f
cm8mg1d7m004fpc688bxo1djl	cm8mftdfd000ppc9dmwt78x3x	cm8mfsxl50007pc6uwrm4s5ei	f
cm8mg1d9e004hpc68ojxnxbnh	cm8mftdfd000ppc9dmwt78x3x	cm8mfsxim0000pc6u69brimrh	f
cm8mg1d9z004jpc681wq2gcbo	cm8mftdin000qpc9doexsb6np	cm8mfsxlj0008pc6uadezznkq	t
cm8mg1dad004lpc6887fmww7d	cm8mftdk6000rpc9donqlknn1	cm8mfsxj00001pc6uhawyytb2	t
cm8mg1dc0004npc688oowc2j6	cm8mftdn4000spc9dqftn6abf	cm8mfsxkf0005pc6ulbf8ys6n	t
cm8mg1dch004ppc68yxpg1w7q	cm8mftdn4000spc9dqftn6abf	cm8mfsxn2000apc6uljercvjn	f
cm8mg1ddg004rpc6895o135rh	cm8mftdpt000tpc9de8m94i7k	cm8mfsxk40004pc6u1j22f8hi	f
cm8mg1ddr004tpc68bydj1nyb	cm8mftdpt000tpc9de8m94i7k	cm8mfsxjs0003pc6uss914o93	f
cm8mg1dei004vpc68johdas5s	cm8mftdpt000tpc9de8m94i7k	cm8mfsxoc000fpc6ujjvmuisb	t
cm8mg1dfb004xpc68rgyjd060	cm8mftdpt000tpc9de8m94i7k	cm8mfsxlj0008pc6uadezznkq	f
cm8mg1dfl004zpc6802a27cj5	cm8mftdqa000upc9dljru5a5m	cm8mfsxoh000gpc6uskg9ltga	f
cm8mg1dfq0051pc680t3jt0xh	cm8mftdqa000upc9dljru5a5m	cm8mfsxl50007pc6uwrm4s5ei	f
cm8mg1dg00053pc68dsnhx29c	cm8mftdqa000upc9dljru5a5m	cm8mfsxj00001pc6uhawyytb2	t
cm8mg1dgb0055pc68wn5igjmz	cm8mftdty000vpc9dndvq0yd2	cm8mfsxl50007pc6uwrm4s5ei	f
cm8mg1dgl0057pc681mjdy2s1	cm8mftdty000vpc9dndvq0yd2	cm8mfsxim0000pc6u69brimrh	t
cm8mg1dgw0059pc68ku0hujix	cm8mftdty000vpc9dndvq0yd2	cm8mfsxn2000apc6uljercvjn	f
cm8mg1dh1005bpc68wwsel667	cm8mftdty000vpc9dndvq0yd2	cm8mfsxnd000bpc6u5nkhbjr9	f
cm8mg1dhg005dpc68a0mlplgk	cm8mftdty000vpc9dndvq0yd2	cm8mfsxnn000cpc6uf7ezaz83	f
cm8mg1dhl005fpc68polp84po	cm8mftdxi000wpc9dl75sp4xq	cm8mfsxkf0005pc6ulbf8ys6n	f
cm8mg1dhp005hpc686xc79a3m	cm8mftdxi000wpc9dl75sp4xq	cm8mfsxjf0002pc6utg8abzee	t
cm8mg1dir005jpc68vqmx7i1g	cm8mftdxi000wpc9dl75sp4xq	cm8mfsxnn000cpc6uf7ezaz83	f
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

COPY public."user" (id, first_name, last_name, email, phone, "isAdmin") FROM stdin;
cm835p7eh0000siq753zr0gpr	Yahya	Moustahsane	yahya.moustahsane@telecom-paris.fr	0767296140	f
cm837tvip0000nkq0sb25y2hd	test	test	ijosijqsodjq@telecom-paris.fr	0102030405	f
cm8381rls0005nkq0xrz5q2e8	coucou	au revoir	jesuisunadministrateur@telecom-paris.fr	0000000000	f
cm83acwtt000ankq0xfggu1xo	Antoine	Huther	antoine.huther@telecom-paris.fr	0628272576	f
cm84gpl6u0000o2q05syvv55e	Emile	Fourcin	emile.fourcin@telecom-paris.fr	0635383773	f
cm84sseux000ao2q06dpo0die	Eya	Mami	eya.mami@telecom-paris.fr	0749673964	f
cm84t1m33000fo2q03nnx0oqp	Mehdi 	El Kouarati 	mehdi.elkouarati@telecom-paris.fr	0783391023	f
cm84uakiv000ko2q0rlqxsqug	Théo	Lartigau	theo.lartigau@telecom-paris.fr	0641807658	f
cm84utnla000po2q0fxpdouao	Thomas	Velard	thomas.velard@telecom-paris.fr	0628761365	f
cm84so5xx0005o2q0olytdjjj	Thomas	Revol	thomas.revol@telecom-paris.fr	0768990496	f
cm88j47qn000yo2q0yuvdb69p	Mathilde	Duval Alfonso	mathilde.duval@telecom-paris.fr	0782114663	f
cm8d33yji0000qnqtsn86va1j	Maël	Messin	mael.messin@telecom-paris.fr	0644029841	f
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


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
-- Name: membre membre_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.membre
    ADD CONSTRAINT membre_pkey PRIMARY KEY (id);


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
-- Name: pole_membre pole_membre_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.pole_membre
    ADD CONSTRAINT pole_membre_pkey PRIMARY KEY (id);


--
-- Name: pole pole_pkey; Type: CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.pole
    ADD CONSTRAINT pole_pkey PRIMARY KEY (id);


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
-- Name: item_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX item_id_key ON public.item USING btree (id);


--
-- Name: item_size_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX item_size_id_key ON public.item_size USING btree (id);


--
-- Name: item_title_fr_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX item_title_fr_key ON public.item USING btree (title_fr);


--
-- Name: membre_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX membre_id_key ON public.membre USING btree (id);


--
-- Name: order_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX order_id_key ON public."order" USING btree (id);


--
-- Name: order_item_size_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX order_item_size_id_key ON public.order_item_size USING btree (id);


--
-- Name: pole_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX pole_id_key ON public.pole USING btree (id);


--
-- Name: pole_membre_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX pole_membre_id_key ON public.pole_membre USING btree (id);


--
-- Name: pole_name_en_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX pole_name_en_key ON public.pole USING btree (name_en);


--
-- Name: pole_name_fr_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX pole_name_fr_key ON public.pole USING btree (name_fr);


--
-- Name: size_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX size_id_key ON public.size USING btree (id);


--
-- Name: size_size_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX size_size_key ON public.size USING btree (size);


--
-- Name: user_email_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);


--
-- Name: user_id_key; Type: INDEX; Schema: public; Owner: bedbusters_app
--

CREATE UNIQUE INDEX user_id_key ON public."user" USING btree (id);


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
-- Name: pole_membre pole_membre_membreId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.pole_membre
    ADD CONSTRAINT "pole_membre_membreId_fkey" FOREIGN KEY ("membreId") REFERENCES public.membre(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: pole_membre pole_membre_poleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bedbusters_app
--

ALTER TABLE ONLY public.pole_membre
    ADD CONSTRAINT "pole_membre_poleId_fkey" FOREIGN KEY ("poleId") REFERENCES public.pole(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

