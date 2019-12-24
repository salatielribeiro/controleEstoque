package com.estoque.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.estoque.model.Produto;
import com.estoque.repository.ProdutoRepository;

@CrossOrigin
@RestController
@RequestMapping("/estoque")
public class ProdutoController {
	
	private List<Produto> produtos;

	@Autowired
	private ProdutoRepository produtoRepository;
	
		
	@GetMapping("/produtos")
	public List<Produto> teste() {
		return produtoRepository.findAll();
	}

	@GetMapping("/produto/{id}")
	ResponseEntity<?> getGroup(@PathVariable Integer id) {
		Optional<Produto> produtos = produtoRepository.findById(id);
		return produtos.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/produto")
	@ResponseBody
	public ResponseEntity<Produto> createGroup(@Valid @RequestBody Produto produto) throws URISyntaxException {
		Produto result = produtoRepository.save(produto);
		return ResponseEntity.created(new URI("/estoque/produto/" + result.getId())).body(result);
	}
	
	@PutMapping("/produto/{id}")
	@ResponseBody
	public ResponseEntity<Produto> updateGroup(@Valid @RequestBody Produto produto) {
		Produto result = produtoRepository.save(produto);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/produto/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Integer id) {
    	produtoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
	  
	public List<Produto> getProdutos() {
		return produtos;
	}

	public void setProdutos(List<Produto> produtos) {
		this.produtos = produtos;
	}

}
