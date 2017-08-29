using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.BL
{
	public static class  MailBL
	{
		public static MailTemplateVM GetTemplate(int templateId)
		{
			try
			{
				using (Shrink2FitEntities context = new Shrink2FitEntities())
				{
					var template = context.MailTemplates.Single(u => u.ID == templateId);
										
					var result = new MailTemplateVM
					{
						ID = template.ID,
						Body = template.Body,
						Subject = template.Subject,
                        MultiLine = template.MultiLine
					};
					return result;
				}
			}
			catch
			{
				return null;
			}
		}
	}
}
