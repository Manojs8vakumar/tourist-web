package com.tourist.planner.service;

import com.tourist.planner.dto.NewsletterRequest;
import com.tourist.planner.model.NewsletterSubscriber;
import com.tourist.planner.repository.NewsletterSubscriberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class NewsletterService {

    private final NewsletterSubscriberRepository subscriberRepository;

    public NewsletterService(NewsletterSubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    public String subscribe(NewsletterRequest req) {
        String cleanEmail = req.getEmail().trim().toLowerCase();
        if (subscriberRepository.existsByEmail(cleanEmail)) {
            return "You are already subscribed to the Plan My Trip Agency dispatch.";
        }
        NewsletterSubscriber subscriber = new NewsletterSubscriber();
        subscriber.setName(req.getName() != null ? req.getName().trim() : "Valued Traveller");
        subscriber.setEmail(cleanEmail);
        subscriber.setSubscribedAt(LocalDateTime.now());
        subscriber.setActive(true);
        subscriberRepository.save(subscriber);
        return "Welcome to Plan My Trip Agency. You will receive our seasonal private invitations and editorial dispatches.";
    }

    @Transactional(readOnly = true)
    public List<NewsletterSubscriber> getAllSubscribers() {
        return subscriberRepository.findAll();
    }
}
