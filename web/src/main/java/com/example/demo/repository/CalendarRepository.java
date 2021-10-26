package com.example.demo.repository;

import com.example.demo.dto.PeriodDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<PeriodDto, Integer> {

    @Query(
            value="with period_dates (date) as (\n" +
                    "    select :startDate \n" +
                    "    Union ALL\n" +
                    "    select DATEADD(day, 1, date)\n" +
                    "    from period_dates\n" +
                    "    where date < :stopDate\n" +
                    ")\n" +
                    "select *\n" +
                    "from period_dates;",
            nativeQuery=true
    )
    List<Date> findDatesFromPeriod(@Param("startDate") Date startDate, @Param("stopDate") Date stopDate);

    @Query(
            value = "select * from periods",
            nativeQuery = true
    )
    List<PeriodDto> findAll();

    @Transactional
    @Modifying
    @Query(
            value="INSERT INTO periods(start_date, stop_date) VALUES(:startDate, :stopDate)",
            nativeQuery=true
    )
    void saveIt(@Param("startDate") Date startDate, @Param("stopDate") Date stopDate);

}
