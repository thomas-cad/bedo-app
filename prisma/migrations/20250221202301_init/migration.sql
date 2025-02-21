-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "bill" BYTEA NOT NULL,
    "event_typeId" TEXT NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_type" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "event_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_size" (
    "id" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,

    CONSTRAINT "item_size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "payment_date" TIMESTAMP(3),
    "ship_date" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item_size" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "item_sizeId" TEXT NOT NULL,

    CONSTRAINT "order_item_size_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_id_key" ON "event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "event_title_key" ON "event"("title");

-- CreateIndex
CREATE UNIQUE INDEX "event_type_id_key" ON "event_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "event_type_type_key" ON "event_type"("type");

-- CreateIndex
CREATE UNIQUE INDEX "item_id_key" ON "item"("id");

-- CreateIndex
CREATE UNIQUE INDEX "item_title_key" ON "item"("title");

-- CreateIndex
CREATE UNIQUE INDEX "size_id_key" ON "size"("id");

-- CreateIndex
CREATE UNIQUE INDEX "size_size_key" ON "size"("size");

-- CreateIndex
CREATE UNIQUE INDEX "item_size_id_key" ON "item_size"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_id_key" ON "order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_item_size_id_key" ON "order_item_size"("id");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_event_typeId_fkey" FOREIGN KEY ("event_typeId") REFERENCES "event_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_size" ADD CONSTRAINT "item_size_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_size" ADD CONSTRAINT "item_size_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_size" ADD CONSTRAINT "order_item_size_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_size" ADD CONSTRAINT "order_item_size_item_sizeId_fkey" FOREIGN KEY ("item_sizeId") REFERENCES "item_size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
