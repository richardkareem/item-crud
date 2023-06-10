package org.stockitem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.stockitem.model.Stock;
import org.stockitem.repo.StockRepo;
import org.stockitem.util.CustomErrorMessage;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    StockRepo stockRepo;


    // -------------------Create a Product-------------------------------------------
    // Save to DB - Insert to Database
    @RequestMapping(value = "/create-item", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<?> createNewStock (@RequestBody Stock stock) throws SQLException, ClassNotFoundException {


            stockRepo.save(stock);
            return new ResponseEntity<>(stock,HttpStatus.CREATED);

    }
    //gettAllItems
    @GetMapping(path = "/items")
    public ResponseEntity <List<Stock>> getAllItems (@RequestBody Stock stock)throws SQLException, ClassNotFoundException{
        List<Stock>stocks = stockRepo.findAll();

        return new ResponseEntity<>(stocks, HttpStatus.OK);
    }
    //update item
    @GetMapping(path = "/item/{id}")
    public ResponseEntity<?> updateItems (@PathVariable("id")long id, @RequestBody Stock stock)throws SQLException, ClassNotFoundException{
        Stock currentStock = stockRepo.findById(id).orElse(null);

        if (currentStock == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        currentStock.setStock(stock.getStock());

        stockRepo.save(currentStock);

        return new ResponseEntity<>(currentStock, HttpStatus.CREATED);
    }
    @DeleteMapping("/item-delete/{id}")
    public ResponseEntity<?> deleteItem (@PathVariable("id")long id){
        CustomErrorMessage customErrorMessage1 = new CustomErrorMessage("id "+id+" has been deleted");
        CustomErrorMessage customErrorMessage2 = new CustomErrorMessage("id "+id+" not found");

        Optional<Stock> stock = stockRepo.findById(id);
        if(stock.isPresent()){
            stockRepo.deleteById(id);
            return new ResponseEntity<>(customErrorMessage1 ,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(customErrorMessage2, HttpStatus.CONFLICT);
        }

    }

}
