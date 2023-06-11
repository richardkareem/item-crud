package org.stockitem.repo;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.stockitem.model.DAOUser;

@Repository
public interface UserDao extends CrudRepository<DAOUser, Long> {
    DAOUser findByUsername(String username);
}