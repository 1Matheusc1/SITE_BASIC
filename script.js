const produtos = [
  {
    id: 1,
    nome: "Boné Fire Preto",
    categoria: "BONÉS",
    imagem: "bone.jpg",
    preco: 49.9,
  },
  {
    id: 2,
    nome: "Camiseta Branca Fire",
    categoria: "CAMISETAS",
    imagem: "camiseta.jpeg",
    preco: 79.9,
  },
  {
    id: 3,
    nome: "Moletom Capuz Fire",
    categoria: "MOLETOM",
    imagem: "moletom.webp",
    preco: 119.9,
  },
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produtoId) {
  const produto = produtos.find((p) => p.id === produtoId);
  carrinho.push(produto);
  salvarCarrinho();
  alert(`${produto.nome} foi adicionado ao carrinho.`);
}

function exibirProdutos(lista) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";
  lista.forEach((produto) => {
    container.innerHTML += `
      <div class="produto">
        <img src="${produto.imagem}" alt="${produto.nome}" />
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button class="btn-add-carrinho" onclick="adicionarAoCarrinho(${
          produto.id
        })">Adicionar ao carrinho</button>
      </div>
    `;
  });
}

exibirProdutos(produtos);

// Filtro por categoria
document.querySelectorAll(".categorias a, .ver-mais").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const cat = el.dataset.categoria;
    const filtrados =
      cat === "TODOS" ? produtos : produtos.filter((p) => p.categoria === cat);
    exibirProdutos(filtrados);
  });
});

// Filtro por busca
document.getElementById("busca").addEventListener("input", (e) => {
  const termo = e.target.value.toLowerCase();
  const filtrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(termo)
  );

  if (filtrados.length > 0) {
    exibirProdutos(filtrados);
  } else {
    const container = document.getElementById("produtos");
    container.innerHTML = `<p style="text-align:center; width: 100%">Nenhum produto encontrado para: <strong>${termo}</strong></p>`;
  }
});
