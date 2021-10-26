package com.example.demo.service;

import com.example.demo.dto.PeriodDto;
import com.example.demo.repository.CalendarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;

    public List<Date> getDatesFromPeriod(Date startDate, Date stopDate)  {
        calendarRepository.saveIt(startDate, stopDate);
        return calendarRepository.findDatesFromPeriod(startDate, stopDate);
    }

    public List<PeriodDto> getAllPeriods()  {
        return calendarRepository.findAll();
    }
}
