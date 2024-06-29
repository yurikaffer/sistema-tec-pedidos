-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "inscricaoEstadual" TEXT,
    "endereco" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" TEXT,
    "cep" TEXT,
    "cnpjOuCPF" TEXT NOT NULL,
    "telefone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descriminacao" TEXT NOT NULL,
    "medida" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdutoPedido" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "unidade" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProdutoPedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_codigo_key" ON "Cliente"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_codigo_key" ON "Produto"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "ProdutoPedido_pedidoId_produtoId_key" ON "ProdutoPedido"("pedidoId", "produtoId");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoPedido" ADD CONSTRAINT "ProdutoPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoPedido" ADD CONSTRAINT "ProdutoPedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
