package com.ecommerce.ecommerce.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PayementService {

    @Autowired
    private PayementRepository payementRepository;

    public Payement addPayement(Payement payement) {
        return payementRepository.save(payement);
    }

    public List<Payement> findAllPayement() {
        return payementRepository.findAll();
    }

    public void deletePay(Long id) {
        payementRepository.deleteById(id);
    }

}
