using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Shrink2FitWeb.Common
{
    public class FaceBookHandler
    {
        const string BASE_FACEBOOK_ADDRESS = "https://graph.facebook.com/me?method=GET&format=json&suppress_http_code=1&access_token={0}";
        const string PICTURE_FACEBOOK_ADDRESS = "https://graph.facebook.com/me/picture?method=GET&redirect=false&access_token={0}";
        const string FRIENDS_FACEBOOK_ADDRESS = "https://graph.facebook.com/me/friends?method=GET&access_token={0}";

        public UserFacebookDetails UserDetails { get; set; }
        public Error Error { get; set; }

        private bool _isError;
        public bool IsError { get { return _isError; } }

        public UserFacebookDetails Facebook(string accessToken)
        {
            Uri url = new Uri(String.Format(BASE_FACEBOOK_ADDRESS, accessToken));

            string id = "";
            /// Get user details 
            using (WebClient client = new WebClient())
            {
                var result = client.DownloadString(url);

                UserDetails = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<UserFacebookDetails>(result);
                Error = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<Error>(result);

                if (result.Contains("error"))
                {
                    _isError = true;
                }
                else
                {
                    _isError = false;
                    id = UserDetails.id;
                }
                
            }

            return UserDetails;

            
        }
    }
}