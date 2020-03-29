package hello;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class HcpControllerTests {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void createACustomerTest() throws Exception {

        this.mockMvc.perform(get("/hcp/customer/create?&name=Andi")).andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Andi"));
    }

    @Test
    public void getAllCustomer() throws Exception {
        this.mockMvc.perform(get("/hcp/customer/create?&name=Andi")).andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Andi"));
    }


    @Test
    public void createCustomerAppointment() throws Exception {

        this.mockMvc.perform(get("/hcp/appointment/create").param("name", "Andi").param("date", "2018-09-16T14:10:25"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Andi"))
                .andExpect(jsonPath("$.date").value("2018-09-16T14:10:25"));
    }

}