package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PeriodDto {

    @Id
    public Integer id;
    @Basic
    public Date startDate;
    @Basic
    public Date stopDate;
}
