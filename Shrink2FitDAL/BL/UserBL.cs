using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.BL
{
    public static class UserBL
    {

        
        public static UserVM GetUserByEmail(string email)
        {
            try
            {
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var user = context.Users.Include("UserStatus").Single(u => u.Email == email);
                    var result = new UserVM
                    {
                        ID = user.ID,
                        CreatedOn = user.CreatedOn,
                        Email = user.Email,
						Name = user.Name,
                        SecondaryEmail = user.SecondaryEmail,
                        LastLogin = user.LastLogin,
                        Password = user.Password,
                        Role = user.Role,
                        Status = user.Status,
                        StatusText = user.UserStatus.Status
                    };
                    return result;
                }
            }
            catch
            {
                return null;
            }
        }

		// Ehud
		public static string GetLastEntrance(int userId)
		{
			try
			{
				using (Shrink2FitEntities context = new Shrink2FitEntities())
				{
                    var user = context.Users.Single(u => u.ID == userId);
					var result = new UserVM
					{
						ID = user.ID,
						CreatedOn = user.CreatedOn,
						Email = user.Email,
						SecondaryEmail = user.SecondaryEmail,
						LastLogin = user.LastLogin,
						Password = user.Password,
						Role = user.Role,
						Status = user.Status,
						StatusText = user.UserStatus.Status
					};
					return result.LastLogin.ToString();
				}
			}
			catch
			{
				return null;
			}
		}
		// Ehud
		public static bool CheckUserName(string newuser)
		{
			List<UserVM> currentUsers = GetAll();

			foreach(UserVM user in currentUsers) {
				if (user.Name == newuser)
				{
					return false;
				}
			}
			return true;
		}

		public static List<RelationshipTypeVM> GetAllRelationships()
		{
			try
			{
				var result = new List<RelationshipTypeVM>();
				using (Shrink2FitEntities context = new Shrink2FitEntities())
				{
					result = context.RelationshipTypes.Select(u => new RelationshipTypeVM
					{
						ID = u.ID,
						RelationsName = u.RelationsName

					}).ToList();
				}
				return result;
			}
			catch
			{
				return new List<RelationshipTypeVM>();
			}
		}

        public static List<UserVM> GetAll()
        {
            try
            {
                var result = new List<UserVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    result = context.Users.Include("UserStatus").Select(u => new UserVM{
                        ID = u.ID,
                        Name = u.Name,
                        FacebookID = u.FacebookID != null ? u.FacebookID : "",
                        CreatedOn = u.CreatedOn,
                        Email = u.Email,
                        SecondaryEmail = u.SecondaryEmail,
                        LastLogin = u.LastLogin,
                        Password = u.Password,
                        Role = u.Role,
                        Status = u.Status,
                        StatusText = u.UserStatus.Status
                        
                    }).ToList();
                }
                return result;
            }
            catch
            {
                return new List<UserVM>();
            }
        }

        public static void UpdateLastLogin(UserVM userModel)
        {
            try
            {
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {

                    var user = context.Users.Single(u => u.ID == userModel.ID);
                    user.LastLogin = DateTime.Now;
                    // use the Israeli time
                    user.LastLogin = ConvertDateTime2Israel();
                    context.SaveChanges();
                    return;
                }
            }
            catch
            {
                throw new Exception("Unable to update user login date");
            }
        }

        public static List<UserVM> GetPage(int pageNumber, int itemsPerPage)
        {
            try
            {
                var result = new List<UserVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    result = context.Users.OrderBy(u => u.ID).Skip((pageNumber - 1) * itemsPerPage).Take(itemsPerPage).Select(u => new UserVM
                    {
                        ID = u.ID,
                        CreatedOn = u.CreatedOn,
                        Email = u.Email,
                        SecondaryEmail = u.SecondaryEmail,
                        LastLogin = u.LastLogin,
                        Password = u.Password,
                        Role = u.Role,
                        Status = u.Status,
                        StatusText = u.UserStatus.Status
                    }).ToList();
                }
                return result;
            }
            catch
            {
                return new List<UserVM>();
            }
        }

        public static void UpdateField(int id, string fieldName, string value)
        {
            try
            {
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var user = context.Users.Single(u => u.ID == id);
					switch (fieldName)
					{
						case "Email":
							user.Email = value;
							break;
						case "SecondaryEmail":
							user.SecondaryEmail = value;
							break;
						case "Name":
							user.Name = value;
							break;
					}
                    
                    context.SaveChanges();
                    return;
                }
            }
            catch
            {
                throw new Exception("Cannot update field");
            }

        }

        public static List<UserStatusVM> GetAllStatus()
        {
            try
            {
                var result = new List<UserStatusVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    result = context.UserStatus.Select(s => new UserStatusVM
                    {
                        ID = s.ID,
                        Status = s.Status
                    }).ToList();
                }
                return result;

            }
            catch
            {
                return new List<UserStatusVM>();
            }
        }

        public static void ChangeStatus(int ID, int status)
        {
            try
            {
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var user = context.Users.Single(u => u.ID == ID);
                    user.Status = status;
                    context.SaveChanges();
                }
            }
            catch
            {
                throw new Exception("Cannot update status");
            }
        }

		public static int AddUser(string email, string password, string username = null) // = null is TEMP, should be handeld in admin/usercontroller/adduser 
        {
            try
            {
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var user = new User
                    {
                        Email = email,
                        Password = password,
						Name = username,
                        // CreatedOn = DateTime.Now,
                        CreatedOn = ConvertDateTime2Israel(),
                        Status = 1,
                        Role = 1
                    };
                    context.Users.Add(user);
                    context.SaveChanges();
                    
                    return user.ID;
                }
            }
            catch
            {
                throw new Exception("Cannot add user");
            }
        }

        public static string GetUserName(int user)
        {
            try
            {
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var username = context.Users.Single(u => u.ID == user).Name;
                    return username;
                }
            }
            catch
            {
                return "";
            }
        }

        public static UserVM GetFacebookUser(UserFacebookDetails details)
        {
            try
            {
                UserVM result = new UserVM();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var user = context.Users.SingleOrDefault(u => u.FacebookID == details.id);
                    if (user == null)
                    {
                        user = new User
                        {
                            Email = "",
                            Password = "987654321",
                            Name = details.name,
                            CreatedOn = DateTime.Now,
                            Status = 1,
                            Role = 1,
                            FacebookID = details.id,
                            UserStatus = context.UserStatus.First()
                        };

                        context.Users.Add(user);

                        context.Entry(user).State = System.Data.EntityState.Added;

                        context.SaveChanges();
                    }

                    var newUser = context.Users.Single(u => u.FacebookID == details.id);

                    result = new UserVM
                    {
                        FacebookID = newUser.FacebookID,
                        ID = newUser.ID,
                        CreatedOn = newUser.CreatedOn,
                        Email = newUser.Email,
                        Name = newUser.Name,
                        SecondaryEmail = newUser.SecondaryEmail,
                        LastLogin = newUser.LastLogin,
                        Password = newUser.Password,
                        Role = newUser.Role,
                        Status = newUser.Status,
                        StatusText = newUser.UserStatus.Status
                    };
                }
                return result;
            }
            catch(Exception ex)
            {
                throw new Exception("Unable to login user");
            }
        }

        public static UserVM GetUserByID(int userID)
        {
            try
            {
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var user = context.Users.Include("UserStatus").Single(u => u.ID == userID);
                    var result = new UserVM
                    {
                        ID = user.ID,
                        CreatedOn = user.CreatedOn,
                        Email = user.Email,
                        Name = user.Name,
                        SecondaryEmail = user.SecondaryEmail,
                        LastLogin = user.LastLogin,
                        Password = user.Password,
                        Role = user.Role,
                        Status = user.Status,
                        StatusText = user.UserStatus.Status
                    };
                    return result;
                }
            }
            catch
            {
                return null;
            }
        }

        public static DateTime ConvertDateTime2Israel()
        {
            var timeUtc = DateTime.UtcNow;
            TimeZoneInfo israelZone = TimeZoneInfo.FindSystemTimeZoneById("Israel Standard Time");
            DateTime israelTime = TimeZoneInfo.ConvertTimeFromUtc(timeUtc, israelZone);
            return israelTime;
        }

    }
}
