import { Product } from "../types.ts";

// Lib para criar id do novo produto
import { v4 } from "https://deno.land/std/uuid/mod.ts";

// Simulação do banco de dados
let products: Product[] = [
  {
    id: "1",
    name: "sofá 3",
    description: "sofá de camurça 3 lugares",
    price: 1199,00
  },
  {
    id: "2",
    name: "mesa",
    description: "mesa de vidro 4 cadeiras",
    price: 350,00
  },
  {
    id: "3",
    name: "fogao",
    description: "fogão 6 bocas Brastemp",
    price: 650,00
  },
];

// @desc   Obtém todos os produtos
// @route  GET /api/v1/products
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @desc   Obtém um produto
// @route  GET /api/v1/products/:id
const getProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "Nenhum produto encontrado",
    };
  }
};

// @desc   Adiciona um produto
// @route  POST /api/v1/products
const addProduct = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Não há dados",
    };
  } else {
    const product: Product = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  }
};

// @desc   Atualiza um produto
// @route  PUT /api/v1/products/:id
const updateProduct = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Não há dados",
    };
    return;
  }

  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();

    const updateData: {
      name?: string;
      description?: string;
      price?: number;
    } = body.value;

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "Produto não encontrado",
    };
  }
};

// @desc   Deleta um produto
// @route  DELETE /api/v1/products/:id
const deleteProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  products = products.filter((p) => p.id !== params.id);
  response.body = {
    success: true,
    data: products,
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
