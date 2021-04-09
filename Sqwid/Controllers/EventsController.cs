using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Sqwid.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sqwid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SqwidDBContext _context;

        public EventsController(IConfiguration configuration, SqwidDBContext context)
        {
            _configuration = configuration;
            _context = context;

        }

        [HttpGet]
        public ActionResult<List<Event>> GetEvents()
        {
            List<Event> events = _context.Events.ToList();
            return Ok(events);
        }

        [HttpGet("groups/{id}")]
        public ActionResult<List<Event>> GetEventsByGroup(int id)
        {
            List<Event> events = _context.Events.Where(x => x.EventGroupId == id).ToList();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetEventById(int id)
        {
            Event myEvent = _context.Events.Where(x => x.EventId == id).FirstOrDefault();
            return Ok(myEvent);
        }

        [HttpPost]
        public ActionResult<Event> CreateEvent(Event incomingData)
        {
            if (ModelState.IsValid)
            {
                Event newEvent = new Event();
                //var name = HttpContext.Session.GetString("username");
                newEvent.EventAdmin = incomingData.EventAdmin;
                newEvent.EventCategory = incomingData.EventCategory;
                newEvent.EventDescription = incomingData.EventDescription;
                newEvent.EventDueDate = DateTime.Now.Date.AddDays(7);
                newEvent.EventGroupId = incomingData.EventGroupId;
                newEvent.EventName = incomingData.EventName;
                newEvent.EventStartDate = DateTime.Now.Date;

                _context.Add(newEvent);
                _context.SaveChanges();
                return Ok(newEvent);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
