package org.stockitem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.stockitem.model.Stock;

import java.util.List;

@Repository
public interface StockRepo extends JpaRepository<Stock, Long> {


}
