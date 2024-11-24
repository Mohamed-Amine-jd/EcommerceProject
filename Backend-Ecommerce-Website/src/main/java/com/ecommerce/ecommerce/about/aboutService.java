package com.ecommerce.ecommerce.about;

import com.ecommerce.ecommerce.contact.contact;
import com.ecommerce.ecommerce.contact.contactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class aboutService {

    @Autowired
    private aboutRepository aboutRepository;

    public List<about> findAllabout() {
        return aboutRepository.findAll();
    }


    public  about updateabout(about about) {return aboutRepository.save(about);
    }
    public about addabout(about about) {
        return aboutRepository.save(about);
    }
    public void deleteabout(Long id) {
        aboutRepository.deleteById(id);
    }
}