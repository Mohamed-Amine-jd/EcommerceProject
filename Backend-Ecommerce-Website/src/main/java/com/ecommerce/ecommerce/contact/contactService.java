package com.ecommerce.ecommerce.contact;

import com.ecommerce.ecommerce.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class contactService {

    @Autowired
    private contactRepository contactRepository;

    public List<contact> findAllcontact() {
        return contactRepository.findAll();
    }

    public contact findcontactById(Long id) {
        return contactRepository.findById(id).orElse(null);
    }

    public contact addcontact(contact contact) {
        return contactRepository.save(contact);
    }

    public  contact updatecontact(contact contact) {
        return contactRepository.save(contact);
    }

    public void deletecontact(Long id) {
        contactRepository.deleteById(id);
    }
}