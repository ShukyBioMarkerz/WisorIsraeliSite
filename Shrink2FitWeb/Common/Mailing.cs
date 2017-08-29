﻿using Shrink2FitDAL.BL;
using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Configuration;
using System.Web.Hosting;

namespace Shrink2FitWeb.Common
{
	public static class Mailing
	{
		/// <summary>
		/// Prepares and send mail to admin
		/// </summary>
		/// <param name="subject"></param>
		/// <param name="body"></param>
		public static void PrepareMail(string[] data, MailType templateId, string attachmentPath = null, bool isMultiLine = false, string usermail = null)
		{
		    ThreadPool.QueueUserWorkItem(state =>
		    {
                // Get right template
                MailTemplateVM template = MailBL.GetTemplate((int)templateId);
                var path = HostingEnvironment.MapPath("~/MailTemplates/" + template.Body);


                string body = System.IO.File.ReadAllText(path);

                MailMessage msg = new MailMessage(
                    WebConfigurationManager.AppSettings["MailFrom"], 
                    usermail == null ? WebConfigurationManager.AppSettings["WisorAdminMailTo" /*"MailTo"*/] : usermail);
                msg.BodyEncoding = msg.SubjectEncoding = Encoding.UTF8;
                msg.IsBodyHtml = true;
		        if (attachmentPath != null)
		        {
                    msg.Attachments.Add(new Attachment(attachmentPath, MediaTypeNames.Application.Octet));
		        }
               
                msg.Subject = template.Subject;
                StringBuilder sb = new StringBuilder();

                if (isMultiLine)
                {
                    StringBuilder inner = new StringBuilder();

                    foreach (var line in data)
                    {
                        inner.AppendFormat(template.MultiLine, line);
                    }

                    sb.AppendFormat(body, inner);
                }
                else
                {
                    sb.AppendFormat(body, data);
                }

                msg.Body = sb.ToString();
                SendMail(msg);

		    });	
		}

        public static void PrepareMail(string[] info, MailType mailType, bool p, int userid)
        {
            try
            {
                var user = UserBL.GetUserByID(userid);
                if (user.Email != "")
                {
                    PrepareMail(info, mailType,null, false, user.Email);
                }
                else
                {
                    PrepareMail(info, Common.MailType.UserHasNoEmail);
                }
            }
            catch (Exception ex)
            {
                Logger.SendInBackground(ex);
            }
        }

        private static void SendMail(MailMessage msg)
        {
            // send by AWS SES system
            SendMailByAWS(msg);
            return;

            string MailServer = System.Configuration.ConfigurationManager.AppSettings["MailServer"];
            string MailUN = System.Configuration.ConfigurationManager.AppSettings["MailUN"];
            string MailPass = System.Configuration.ConfigurationManager.AppSettings["MailPass"];
            string MailPort = System.Configuration.ConfigurationManager.AppSettings["MailPort"];

            System.Net.Mail.SmtpClient smtpClient = new System.Net.Mail.SmtpClient();
            smtpClient.Host = MailServer;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Port = Convert.ToInt32(MailPort);
            smtpClient.Credentials = new System.Net.NetworkCredential(MailUN, MailPass);
            smtpClient.Timeout = 200000;
            smtpClient.EnableSsl = true;

            msg.Subject = msg.Subject;
            smtpClient.SendAsync(msg, null);
        }

         static void SendMailByAWS(MailMessage msg)
        {
            // Supply your SMTP credentials below. 
            // The port you will connect to on the Amazon SES SMTP endpoint. 
            // We are choosing port 587 because we will use STARTTLS to encrypt the connection.
            const int PORT = 587;
            
            // read configuration info
            string HOST = System.Configuration.ConfigurationManager.AppSettings["MailServer"];
            string SMTP_USERNAME = System.Configuration.ConfigurationManager.AppSettings["MailUN"];
            string SMTP_PASSWORD = System.Configuration.ConfigurationManager.AppSettings["MailPass"];
            // string MailPort = System.Configuration.ConfigurationManager.AppSettings["MailPort"];

            // Create an SMTP client with the specified host name and port.
            using (System.Net.Mail.SmtpClient client =
                new System.Net.Mail.SmtpClient(HOST, PORT))
            {
                // Create a network credential with your SMTP user name
                // and password.
                client.Credentials =
                    new System.Net.NetworkCredential(SMTP_USERNAME, SMTP_PASSWORD);

                // Use SSL when accessing Amazon SES. The SMTP session will begin on an unencrypted connection, and then the client will
                // issue a STARTTLS command to upgrade to an encrypted connection using SSL.
                client.EnableSsl = true;

                // Send the email. 
                try
                {
                    //client.Send(FROM, TO, SUBJECT, BODY);
                    client.Send(msg);
                    Console.WriteLine("Email sent!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("The email was not sent. Error message: " + ex.Message);
                }
            }
        }

    }
}