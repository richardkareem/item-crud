package org.stockitem.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    StockRepo stockRepo;

    public static final Logger logger = LoggerFactory.getLogger(ApiController.class);


    // -------------------Create a Product-------------------------------------------
    // Save to DB - Insert to Database
    @RequestMapping(value = "/create-item", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<?> createNewStock (@RequestBody Stock stock) throws SQLException, ClassNotFoundException {


            stockRepo.save(stock);
            logger.info("Berhasil Membuat item dengan id "+ stock.getId());
            return new ResponseEntity<>(stock,HttpStatus.CREATED);


    }
    //gettAllItems
//    @GetMapping(path = "/items", produces = "application/json")
    @RequestMapping(value = "/items", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity <List<Stock>> getAllItems ()throws  SQLException, ClassNotFoundException{
        List<Stock>stocks = stockRepo.findAll();

        return new ResponseEntity<>(stocks, HttpStatus.OK);
    }
    //update item
//    @GetMapping(path = "/item/{id}")
    @RequestMapping(value = "/item/{id}", method = RequestMethod.PUT, produces = "application/json")
    public ResponseEntity<?> updateItems (@PathVariable("id")long id, @RequestBody Stock stock)throws SQLException, ClassNotFoundException{
        Stock currentStock = stockRepo.findById(id).orElse(null);

        if (currentStock == null){
            return new ResponseEntity<>(new CustomErrorMessage("Item with ID: "+id+" Not Found"), HttpStatus.NOT_FOUND);
        }
        currentStock.setCost_buy(stock.getCost_buy());
        currentStock.setCost_sell(stock.getCost_sell());
        currentStock.setImg(stock.getImg());
        currentStock.setStock(stock.getStock());

        stockRepo.save(currentStock);

        return new ResponseEntity<>(currentStock, HttpStatus.CREATED);
    }
//    @DeleteMapping("/item-delete/{id}")
    @RequestMapping(value = "/item-delete/{id}", method = RequestMethod.DELETE, produces = "application/json")
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
