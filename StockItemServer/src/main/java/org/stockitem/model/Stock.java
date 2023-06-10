package org.stockitem.model;

import javax.persistence.*;

@Entity
@Table(name="item")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String img;
    @Column(unique = true)
    private String item;
    private double cost_buy;
    private double cost_sell;
    private int stock;

    public long getId() {
        return id;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public double getCost_buy() {
        return cost_buy;
    }

    public void setCost_buy(double cost_buy) {
        this.cost_buy = cost_buy;
    }

    public double getCost_sell() {
        return cost_sell;
    }

    public void setCost_sell(double cost_sell) {
        this.cost_sell = cost_sell;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
