package com.example.demo.controller;

import com.example.demo.dto.PeriodDto;
import com.example.demo.service.CalendarService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class PeriodController {

    private final CalendarService calendarService;

    final ObjectMapper objectMapper = new ObjectMapper();
    private final SimpleDateFormat  formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

    @CrossOrigin
    @ResponseBody
    @GetMapping(value = "/period-dates", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getDatesInPeriod(@RequestParam String startDate, @RequestParam String stopDate)
            throws ParseException, JsonProcessingException {
        List<Date> datesFromPeriod = calendarService.getDatesFromPeriod(
                formatter.parse(startDate),
                formatter.parse(stopDate)
        );
        List<String> collect = datesFromPeriod.stream().map(formatter::format).collect(Collectors.toList());
        Map<String, List<String>> dates_in_period = Collections.singletonMap("datesInPeriod", collect);
        return ResponseEntity.ok(objectMapper.writeValueAsString(dates_in_period));
    }

    @CrossOrigin
    @ResponseBody
    @GetMapping(value = "/all-periods", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getAllPeriods() throws JsonProcessingException {
        List<PeriodDto> allPeriods = calendarService.getAllPeriods();
        Map<Integer, String> periods = new HashMap<>();
        allPeriods.forEach(p -> periods.put(p.id, p.startDate + ":" + p.stopDate));
        return ResponseEntity.ok(objectMapper.writeValueAsString(periods));
    }

    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<String> jsonParseError() {
        return new ResponseEntity("Error occurred during parsing data", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ParseException.class)
    public ResponseEntity<String> notValid() {
        return new ResponseEntity("Not valid parameters", HttpStatus.BAD_REQUEST);
    }
}
