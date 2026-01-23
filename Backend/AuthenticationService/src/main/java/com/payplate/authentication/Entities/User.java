package com.payplate.authentication.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class User {

	@Id
	@Column(name="userid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userid;

	@Column(name="username")
	private String username;

	@Column(name="password")
	private String password;

	@Column(name="mobileno")
	private String mobileno;

	@Column(name="questionid")
	private int questionid;

	@Column(name="answer")
	private String answer;

	@Column(name="address")
	private String address;

	@Column(name="roleid")
	private int roleid;

	public Integer getUserId() {
		return userid;
	}

	public void setUserId(Integer userid) {
		this.userid = userid;
	}

	public String getUserName() {
		return username;
	}

	public void setUserName(String userName) {
		this.username = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobileNo() {
		return mobileno;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileno = mobileNo;
	}

	public int getQuestionId() {
		return questionid;
	}

	public void setQuestionId(int questionId) {
		this.questionid = questionId;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public int getRoleId() {
		return roleid;
	}

	public void setRoleId(int roleId) {
		this.roleid = roleId;
	}

	public User(Integer userId, String userName, String password, String mobileNo, int questionId, String answer,
			String address, int roleId) {
		super();
		this.userid = userId;
		this.username = userName;
		this.password = password;
		this.mobileno = mobileNo;
		this.questionid = questionId;
		this.answer = answer;
		this.address = address;
		this.roleid = roleId;
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}





}
