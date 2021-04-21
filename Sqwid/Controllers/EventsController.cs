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

        [HttpGet("active/user/{id}")]
        public ActionResult<List<Event>> GetActiveEventsByUser(int id)
        {
            List<UserGroup> groups = _context.UserGroups.Where(x => x.UserGroupUserId == id).ToList();
            List<Event> allEvents = new List<Event>();
            foreach (var g in groups)
            {
                List<Event> events = _context.Events.Where(x => x.EventGroupId == g.UserGroupGroupId).Where(y => y.EventDueDate >= DateTime.Now).ToList();
                allEvents.AddRange(events);
            }
            return Ok(allEvents);
        }

        [HttpGet("past/user/{id}")]
        public ActionResult<List<Event>> GetPastEventsByUser(int id)
        {
            List<UserGroup> groups = _context.UserGroups.Where(x => x.UserGroupUserId == id).ToList();
            List<Event> allEvents = new List<Event>();
            foreach (var g in groups)
            {
                List<Event> events = _context.Events.Where(x => x.EventGroupId == g.UserGroupGroupId).Where(y => y.EventDueDate < DateTime.Now).ToList();
                allEvents.AddRange(events);
            }
            return Ok(allEvents);
        }

        [HttpGet("user/{id}")]
        public ActionResult<List<Event>> GetAllEventsByUser(int id)
        {
            List<UserGroup> groups = _context.UserGroups.Where(x => x.UserGroupUserId == id).ToList();
            List<Event> allEvents = new List<Event>();
            foreach (var g in groups)
            {
                List<Event> events = _context.Events.Where(x => x.EventGroupId == g.UserGroupId).ToList();
                allEvents.AddRange(events);
            }
            return Ok(allEvents);
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
