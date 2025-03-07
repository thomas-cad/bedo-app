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
-- Name: public; Type: SCHEMA; Schema: -; Owner: dev
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO dev;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: dev
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: dev
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


ALTER TABLE public._prisma_migrations OWNER TO dev;

--
-- Name: event; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.event (
    id text NOT NULL,
    start_date timestamp(3) without time zone NOT NULL,
    end_date timestamp(3) without time zone NOT NULL,
    title text,
    description text,
    bill bytea NOT NULL,
    "event_typeId" text NOT NULL
);


ALTER TABLE public.event OWNER TO dev;

--
-- Name: event_type; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.event_type (
    id text NOT NULL,
    type text NOT NULL
);


ALTER TABLE public.event_type OWNER TO dev;

--
-- Name: item; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.item (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    image text NOT NULL
);


ALTER TABLE public.item OWNER TO dev;

--
-- Name: item_size; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.item_size (
    id text NOT NULL,
    stock integer NOT NULL,
    "itemId" text NOT NULL,
    "sizeId" text NOT NULL
);


ALTER TABLE public.item_size OWNER TO dev;

--
-- Name: order; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public."order" (
    id text NOT NULL,
    status text NOT NULL,
    order_date timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL,
    total double precision NOT NULL
);


ALTER TABLE public."order" OWNER TO dev;

--
-- Name: order_item_size; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.order_item_size (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "item_sizeId" text NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.order_item_size OWNER TO dev;

--
-- Name: size; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.size (
    id text NOT NULL,
    size text NOT NULL
);


ALTER TABLE public.size OWNER TO dev;

--
-- Name: user; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public."user" (
    id text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL
);


ALTER TABLE public."user" OWNER TO dev;

--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- Name: event_type event_type_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.event_type
    ADD CONSTRAINT event_type_pkey PRIMARY KEY (id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- Name: item_size item_size_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.item_size
    ADD CONSTRAINT item_size_pkey PRIMARY KEY (id);


--
-- Name: order_item_size order_item_size_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.order_item_size
    ADD CONSTRAINT order_item_size_pkey PRIMARY KEY (id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: size size_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.size
    ADD CONSTRAINT size_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: event_id_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX event_id_key ON public.event USING btree (id);


--
-- Name: event_title_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX event_title_key ON public.event USING btree (title);


--
-- Name: event_type_id_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX event_type_id_key ON public.event_type USING btree (id);


--
-- Name: event_type_type_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX event_type_type_key ON public.event_type USING btree (type);


--
-- Name: item_id_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX item_id_key ON public.item USING btree (id);


--
-- Name: item_size_id_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX item_size_id_key ON public.item_size USING btree (id);


--
-- Name: item_title_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX item_title_key ON public.item USING btree (title);


--
-- Name: order_id_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX order_id_key ON public."order" USING btree (id);


--
-- Name: order_item_size_id_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX order_item_size_id_key ON public.order_item_size USING btree (id);


--
-- Name: size_id_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX size_id_key ON public.size USING btree (id);


--
-- Name: size_size_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX size_size_key ON public.size USING btree (size);


--
-- Name: user_id_key; Type: INDEX; Schema: public; Owner: dev
--

CREATE UNIQUE INDEX user_id_key ON public."user" USING btree (id);


--
-- Name: event event_event_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT "event_event_typeId_fkey" FOREIGN KEY ("event_typeId") REFERENCES public.event_type(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: item_size item_size_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.item_size
    ADD CONSTRAINT "item_size_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.item(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: item_size item_size_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.item_size
    ADD CONSTRAINT "item_size_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES public.size(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: order_item_size order_item_size_item_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.order_item_size
    ADD CONSTRAINT "order_item_size_item_sizeId_fkey" FOREIGN KEY ("item_sizeId") REFERENCES public.item_size(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: order_item_size order_item_size_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.order_item_size
    ADD CONSTRAINT "order_item_size_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: order order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: dev
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

